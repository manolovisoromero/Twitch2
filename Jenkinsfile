def mavenImage = 'maven:3.3.3'
def nodeImage = 'node:14.16.0-alpine'

pipeline {
        agent none
        tools {
        jdk 'OpenJDK-11'
        nodejs 'NodeJS'
        }
    stages {
        stage('Build VideoServiceJS') {
            agent { docker { image nodeImage } }

            steps {
                sh '''
               cd VideoServiceJS
               node --version
               npm install
               '''
            }
        }

        stage('Test VideoServiceJS') {
                agent { docker { image nodeImage } }

            steps {
                sh '''
                 cd VideoServiceJS
                 npm test
                 '''}
            post {
                    success {
                            junit checksName: 'Jest Tests', testResults: 'VideoServiceJS/**/*.xml'
                    }
            }
        }

        stage ('Build  VideoService') {
            agent { docker { image mavenImage } }
            steps {
                sh '''
                cd VideoService
                mvn -Dmaven.test.failure.ignore=true install
                '''
            }
            post {
                success {
                    junit 'VideoService/target/surefire-reports/**/*.xml'
                }
            }
        }
    }
}