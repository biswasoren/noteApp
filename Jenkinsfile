pipeline {
    agent {
        docker {
            image 'node:8'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Init') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn run build'
            }
        }
        stage('Deploy') {
            steps {
                sh './scripts/run.sh'
            }
        }
    }
}