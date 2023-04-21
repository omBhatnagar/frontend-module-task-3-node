pipeline {
    agent any

    stages {
        
        stage('Initialize') {
            def dockerHome = tool 'myDocker'
            env.PATH = "${dockerHome}/bin:${env.PATH}"
        }

        stage('Tooling versions') {
            steps{
                sh '''
                    docker --version
                    docker compose version
                    '''
            }
        }
    }
}