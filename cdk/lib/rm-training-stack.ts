import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class RMTrainingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket for Frontend
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: `rm-training-${this.account}-${this.region}`,
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      }
    });

    // Cognito User Pool
    const userPool = new cognito.UserPool(this, 'RMUserPool', {
      userPoolName: 'rm-training-users',
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true
      }
    });

    const userPoolClient = new cognito.UserPoolClient(this, 'RMUserPoolClient', {
      userPool,
      generateSecret: false,
      authFlows: {
        userPassword: true,
        userSrp: true
      }
    });

    // DynamoDB Tables
    const rmProfilesTable = new dynamodb.Table(this, 'RMProfiles', {
      tableName: 'rm-profiles',
      partitionKey: { name: 'rmId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const simulationsTable = new dynamodb.Table(this, 'Simulations', {
      tableName: 'simulations',
      partitionKey: { name: 'sessionId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const recommendationsTable = new dynamodb.Table(this, 'Recommendations', {
      tableName: 'recommendations',
      partitionKey: { name: 'customerId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // Lambda Functions
    const apiLambda = new lambda.Function(this, 'APILambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          const { httpMethod, path, body } = event;
          
          // Simple routing
          if (path === '/api/v1/simulation/start' && httpMethod === 'POST') {
            return {
              statusCode: 200,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                sessionId: 'sim-' + Date.now(),
                customerPersona: { name: 'Alex Wong', age: 28, risk: 'moderate' },
                objectives: ['rapport', 'needs-analysis', 'recommendation']
              })
            };
          }
          
          if (path === '/api/v1/recommend' && httpMethod === 'POST') {
            return {
              statusCode: 200,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                recommendations: [{
                  product: 'UOB Term Life Plus',
                  score: 0.92,
                  reasons: ['Age-appropriate', 'Risk match', 'Goal alignment']
                }]
              })
            };
          }
          
          return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Not found' })
          };
        };
      `),
      environment: {
        RM_PROFILES_TABLE: rmProfilesTable.tableName,
        SIMULATIONS_TABLE: simulationsTable.tableName,
        RECOMMENDATIONS_TABLE: recommendationsTable.tableName
      }
    });

    // Grant DynamoDB permissions
    rmProfilesTable.grantReadWriteData(apiLambda);
    simulationsTable.grantReadWriteData(apiLambda);
    recommendationsTable.grantReadWriteData(apiLambda);

    // API Gateway
    const api = new apigateway.RestApi(this, 'RMAPI', {
      restApiName: 'RM Training API',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization']
      }
    });

    const apiIntegration = new apigateway.LambdaIntegration(apiLambda);
    
    // API Routes
    const apiV1 = api.root.addResource('api').addResource('v1');
    
    const simulation = apiV1.addResource('simulation');
    simulation.addResource('start').addMethod('POST', apiIntegration);
    
    apiV1.addResource('recommend').addMethod('POST', apiIntegration);

    // Outputs
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: distribution.distributionDomainName,
      description: 'CloudFront Distribution URL'
    });

    new cdk.CfnOutput(this, 'S3BucketName', {
      value: websiteBucket.bucketName,
      description: 'S3 Bucket for website files'
    });

    new cdk.CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
      description: 'Cognito User Pool ID'
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
      description: 'Cognito User Pool Client ID'
    });

    new cdk.CfnOutput(this, 'APIEndpoint', {
      value: api.url,
      description: 'API Gateway endpoint'
    });
  }
}
