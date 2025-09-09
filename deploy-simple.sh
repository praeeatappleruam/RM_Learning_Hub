#!/bin/bash

echo "🚀 Deploying RM Training Platform to AWS S3..."

# Set region
export AWS_DEFAULT_REGION=us-east-1

# Create unique bucket name
BUCKET_NAME="rm-training-demo-$(date +%s)"
echo "📦 Creating S3 bucket: $BUCKET_NAME"

# Create bucket
aws s3 mb s3://$BUCKET_NAME --region us-east-1

# Configure bucket for static website hosting
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Set bucket policy for public read access
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json

# Upload demo files
echo "📁 Uploading demo files..."
aws s3 sync demo/ s3://$BUCKET_NAME/ --delete

# Get website URL
WEBSITE_URL="http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"

echo ""
echo "🎉 Deployment Complete!"
echo "🌐 Public URL: $WEBSITE_URL"
echo "📊 S3 Bucket: $BUCKET_NAME"
echo ""
echo "✨ Your RM Training Platform demo is now live!"
echo "Share this link: $WEBSITE_URL"
echo ""

# Clean up
rm bucket-policy.json

# Save URL to file
echo $WEBSITE_URL > public-url.txt
echo "💾 URL saved to public-url.txt"
