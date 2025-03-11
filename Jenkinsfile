pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:latest'
        }
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
    
}
