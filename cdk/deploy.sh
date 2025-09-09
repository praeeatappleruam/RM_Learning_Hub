#!/bin/bash

echo "🚀 Deploying RM Training Platform..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Bootstrap CDK (if needed)
echo "🏗️ Bootstrapping CDK..."
npx cdk bootstrap

# Deploy stack
echo "☁️ Deploying to AWS..."
npx cdk deploy --require-approval never

# Upload demo files to S3
echo "📁 Uploading demo files..."
BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name RMTrainingStack --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' --output text)

if [ ! -z "$BUCKET_NAME" ]; then
    aws s3 sync ../demo/ s3://$BUCKET_NAME/ --delete
    echo "✅ Demo uploaded to S3 bucket: $BUCKET_NAME"
else
    echo "❌ Could not find S3 bucket name"
fi

# Get CloudFront URL
CLOUDFRONT_URL=$(aws cloudformation describe-stacks --stack-name RMTrainingStack --query 'Stacks[0].Outputs[?OutputKey==`WebsiteURL`].OutputValue' --output text)

echo ""
echo "🎉 Deployment complete!"
echo "🌐 Website URL: https://$CLOUDFRONT_URL"
echo "📊 Check AWS Console for all resources"
echo ""
