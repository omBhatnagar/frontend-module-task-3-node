pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-omBhatnagar')
        AWS_SECRET_KEY = credentials('aws-omBhatnagar')
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
        stage('Clean-up'){
            sh 'docker context use default'
            sh 'docker context rm myecscontext1'
        }
    }
}