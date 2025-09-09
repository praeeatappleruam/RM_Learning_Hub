# RM Training Platform - CDK Deployment

## Quick Deploy

```bash
cd cdk
./deploy.sh
```

## Manual Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure AWS credentials:**
   ```bash
   aws configure
   ```

3. **Deploy infrastructure:**
   ```bash
   npm run deploy
   ```

4. **Upload demo files:**
   ```bash
   BUCKET=$(aws cloudformation describe-stacks --stack-name RMTrainingStack --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' --output text)
   aws s3 sync ../demo/ s3://$BUCKET/
   ```

## Infrastructure Created

- **S3 + CloudFront**: Frontend hosting
- **Cognito**: User authentication
- **API Gateway + Lambda**: Backend APIs
- **DynamoDB**: Data storage (profiles, simulations, recommendations)

## Outputs

- `WebsiteURL`: CloudFront distribution URL
- `APIEndpoint`: API Gateway endpoint
- `UserPoolId`: Cognito User Pool ID

## Clean Up

```bash
npm run destroy
```

## Cost Estimate

- **Development**: ~$5-10/month
- **Production**: ~$50-100/month (depending on usage)

Most services use pay-per-request pricing for cost optimization.
