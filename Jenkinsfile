pipeline {
    agent any

    stages {
        stage('Tooling versions') {
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