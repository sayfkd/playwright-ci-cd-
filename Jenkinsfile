pipeline {
       agent { docker { image 'mcr.microsoft.com/playwright:v1.51.0-noble' } }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npm install --save-dev @playwright/test allure-playwright'
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

        stage('Publish Allure Report') {
            steps {
                archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
            }
        }
    }
    
}