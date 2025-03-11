pipeline {
       agent { docker { image 'mcr.microsoft.com/playwright:v1.51.0-noble' } }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'PLAYWRIGHT_JUNIT_OUTPUT_NAME=results.xml npx playwright test --reporter=junit'
            }
        }

        stage('Publish JUnit Report') {
            steps {
                    junit '**/results.xml' 
            }
        }
    }
    
}