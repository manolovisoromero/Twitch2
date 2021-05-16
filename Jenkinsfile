def mavenImage = 'maven:3.3.3'
def nodeImage = 'node:14.16.0-alpine'
def registry = 'mvisoromero/twitch2'
pipeline {
        agent none
        tools {
        jdk 'OpenJDK-11'
        nodejs 'NodeJS'
        }
        environment {
            dockerImage = ''
        }
    stages {
        stage('VideoServiceJS: Build & Test') {
                agent { docker { image nodeImage } }
            steps {
                sh '''
                 cd VideoServiceJS
                 npm install
                 npm test
                 '''}
            post {
                    success {
                            junit checksName: 'Jest Tests', testResults: 'VideoServiceJS/**/*.xml'
                    }
            }
        }
        stage('Building image') {
            agent any
            steps {
                dir('./VideoServiceJS') {
                    script {
                        dockerImage = docker.build(registry + ":$env.BUILD_ID")
                    }
                }
            }
        }

        stage('Push image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'DockerCred') {
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy to GKE') {
            steps {
            sh "sed -i 's/twitch2:latest/VideoServiceJS:${env.BUILD_ID}/g' deployment.yaml"
            step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }

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
