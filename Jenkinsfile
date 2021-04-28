def mavenImage = 'maven:3.3.3'
def nodeImage = 'node:14.16.0-alpine'
pipeline {
        agent none
        tools {
        jdk 'OpenJDK-11'
        nodejs 'NodeJS'
        }
        environment {
            registry = 'mvisoromero/twitch2'
            registryCredential = 'DockerCred'
            dockerImage = ''
        }
    stages {
        // stage('Build VideoServiceJS') {
        //     agent { docker { image nodeImage } }

        //     steps {
        //         sh '''
        //        cd VideoServiceJS
        //        node --version
        //        npm install
        //        '''
        //     }
        // }

        // stage('Test VideoServiceJS') {
        //         agent { docker { image nodeImage } }
        //     steps {
        //         sh '''
        //          cd VideoServiceJS
        //          npm test
        //          '''}
        //     post {
        //             success {
        //                     junit checksName: 'Jest Tests', testResults: 'VideoServiceJS/**/*.xml'
        //             }
        //     }
        // }

        stage('Clone git') {
                agent any

            steps {
                git([url: 'https://github.com/manolovisoromero/Twitch2.git', branch: 'main'])
            }
        }
        stage('Build image') {
                agent any

            steps {
                dockerImage = docker.build 'mvisoromero/videoservicejs'
            }
        }

            // stage('dockerfile test') {
            //     agent { docker { image nodeImage } }

            // steps {
            //         sh 'node --version'
            //         sh 'svn --version'
            // }
            // }

        // stage ('Build  VideoService') {
        //     agent { docker { image mavenImage } }
        //     steps {
        //         sh '''
        //         cd VideoService
        //         mvn -Dmaven.test.failure.ignore=true install
        //         '''
        //     }
        //     post {
        //         success {
        //             junit 'VideoService/target/surefire-reports/**/*.xml'
        //         }
        //     }
        // }
    }
}
