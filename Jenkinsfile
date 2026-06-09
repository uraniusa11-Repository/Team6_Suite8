pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        CI            = 'true'
        LOG_CONSOLE   = 'false'
        LOG_LEVEL     = 'error'
        SUITE_URL      = credentials('SUITE_URL')
        SUITE_USERNAME = credentials('SUITE_USERNAME')
        SUITE_PASSWORD            = credentials('SUITE_PASSWORD')
        PLAYWRIGHT_HTML_OUTPUT_DIR = 'playwright-report'
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install chromium --with-deps'
            }
        }

        stage('Generate BDD Specs') {
            steps {
                bat 'npx bddgen'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test --project=setup --project=bdd --headed --reporter=html'
            }
        }

    }

    post {
        always {
            publishHTML(target: [
                allowMissing         : true,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                reportName           : 'Playwright Test Report'
            ])
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'logs/**',              allowEmptyArchive: true
        }
        success {
            echo 'All tests passed.'
        }
        failure {
            echo 'Tests failed — check the archived reports.'
        }
    }
}
