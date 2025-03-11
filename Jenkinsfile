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
                sh 'npx playwright test'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: '**/test-results/**/trace.zip', followSymlinks: false
        }
}

}