pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY = credentials('aws_access_key_id')
        AWS_SECRET_KEY = credentials('aws_secret_access_key')
    }

    stages {
        stage('TEST: Tooling versions and creating ecs context') {
           steps {
                sh '''
                docker --version
                docker compose version
                '''
                 sh 'docker context create ecs myecscontext1 --from-env'
                 sh 'docker context use myecscontext1'
                 sh 'docker context ls'
            }
        }
    }
}