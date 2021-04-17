def mavenImage = 'maven:3.3.3'


pipeline {
        agent none
        tools {
        jdk 'OpenJDK-11'
        nodejs 'NodeJS'
        }
    stages {
        stage('Build VideoServiceJS') {
            agent { docker { image 'node:14.16.0-alpine' } }

            steps {
                sh '''
               cd VideoServiceJS
               node --version
               npm install
               '''
            }
        }

        stage('Test VideoServiceJS') {
                agent { docker { image 'node:14.16.0-alpine' } }

            steps {
                sh '''
                 cd VideoServiceJS
                 npm test

                 '''}
            post {
                    success {
                            junit checksName: 'Jest Tests', testResults: 'junit.xml'
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
