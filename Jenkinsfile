pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\watchlist" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\watchlist"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\watchlist"
                xcopy /E /I /Y frontend\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\watchlist"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('Backend-2') {
                    bat 'mvn clean package '
                }
            }
        }

        // ===== BACKEND DEPLOY (Context: /Backend-2) =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                REM Remove old deployment
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Backend-2.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Backend-2.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Backend-2" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Backend-2"
                )

                REM Deploy new WAR
                copy "Backend-2\\target\\Backend-2.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Backend-2.war"
                '''
            }
        }

    }

    post {
        success {
            echo '✅ Deployment Successful at /Backend-2'
        }
        failure {
            echo '❌ Deployment Failed'
        }
    }
}
