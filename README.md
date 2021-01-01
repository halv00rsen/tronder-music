# Trønder Music

A SPA for interacting with the Spotify API.
Uses `Implicit Grant` for authorizing with the Spotify Api. The authorization is done solely between the SPA and Spotify. The access token granted is valid for one hour.

## CI/CD Setup

1. Write code and push to Github.
2. A Github Action starts to build the application.
3. The action syncs the built code into an S3 bucket.
4. The SPA is made available via AWS CloudFront.

After the code is synced into the S3 bucket, it is instantly made available to end users.

## AWS Setup

- S3 for persisting application code.
- CloudFront for serving the content to end users.
- ACM for handling SSL certificate. Domain is handled elsewhere but Route53 can be used.
- IAM user giving access to S3 bucket for Github Action.

### Setup IAM user for Github Action

1. Create a new user within IAM.
2. Create a new policy and attach it to the created user.
   ```
   {
      "Version": "2012-10-17",
      "Statement": [
         {
            "Sid": "SyncBucketCliAction",
            "Effect": "Allow",
            "Action": [
               "s3:DeleteObject",
               "s3:GetBucketLocation",
               "s3:GetObject",
               "s3:ListBucket",
               "s3:PutObject",
            ],
            "Resource": [
               "arn:aws:s3:::your-bucket-name",
               "arn:aws:s3:::your-bucket-name/*"
            ]
         }
      ]
   }
   ```
   \_Replace `your-bucket-name` with the name of your bucket.
   This will grant the user permission to delete, read and write objects into your bucket.
3. Save `secret access key` and `access key id` in a safe location, or put it directly into your repository's secret. _Remark, the secret access key can only be downloaded once you should be kept secret._

## Github Action

The action is defined within the project, see [production.yml](./.github/workflows/production.yml).
The action requires some secrets to function.

- AWS_PRODUCTION_BUCKET_NAME - name of the bucket.
- AWS_REGION - the AWS region where the bucket is located.
- AWS_ACCESS_KEY_ID - access key id for the dedicated IAM user. See `Setup IAM user`.
- AWS_SECRET_ACCESS_KEY - secret access key for the dedicated IAM user. See `Setup IAM user`.
- REACT_APP_SPOTIFY_CLIENT_ID - client id from Spotify dashboard.
- REACT_APP_SPOTIFY_REDIRECT_URI - redirect URI set in Spotify dashboard.

## Spotify

_For implicit grant_.

1. Register your application at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/login).
   - Set `website name` and `redirect URI`. For local development, add `http://localhost:3000/login` into the redirect URI.
   - Retrieve the application's `client id`.
2. Create a file `.env.development` within the root of the project. Add the following to this file:
   ```
   REACT_APP_SPOTIFY_CLIENT_ID=<client-id>
   REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/login
   REACT_APP_CLIENT_VERSION=development
   ```
3. See [spotify.ts](./src/service/spotify.ts) for scopes used within the project.
   These scopes are used for getting the user's permission to access their Spotify data, and the application won't work if the user denies these. See [Spotify Authorization Scopes](https://developer.spotify.com/documentation/general/guides/scopes/) for the full list.

## Spotify Resources

- [Spotify Developer Terms](https://developer.spotify.com/terms/)
- [Spotify Web Api JS](https://github.com/JMPerez/spotify-web-api-js)
- [Spotify Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/)
- [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/login)
- [Spotify Api Reference](https://developer.spotify.com/documentation/web-api/reference-beta/)
- [Spotify Authorization Scopes](https://developer.spotify.com/documentation/general/guides/scopes/)

## Other Resources

- [How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively/)
