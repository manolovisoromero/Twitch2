def mavenImage = 'maven:3.3.3'
def nodeImage = 'node:14.16.0-alpine'
def registry = 'mvisoromero/videoservicejs'
pipeline {
        agent none
        tools {
        jdk 'OpenJDK-11'
        nodejs 'NodeJS'
        }
        environment {
            dockerImage = ''
            PROJECT_ID = 'third-light-313719'
            CLUSTER_NAME = 'twitch2'
            LOCATION = 'europe-west1-b'
            CREDENTIALS_ID = 'gke'
        }
//     stages {
//         stage('videoservicejs: Build & Test') {
//                 agent { docker { image nodeImage } }
//             steps {
//                 sh '''
//                  cd videoservicejs
//                  npm install
//                  npm test
//                  '''}
//             post {
//                     success {
//                             junit checksName: 'Jest Tests', testResults: 'videoservicejs/**/*.xml'
//                     }
//             }
//         }
//         stage('Building image') {
//             agent any
//             steps {
//                 dir('./videoservicejs') {
//                     script {
//                         dockerImage = docker.build(registry + ":$env.BUILD_ID")
//                     }
//                 }
//             }
//         }

//         stage('Push image') {
//             steps {
//                 script {
//                     docker.withRegistry('https://registry.hub.docker.com', 'DockerCred') {
//                         dockerImage.push('latest')
//                     }
//                 }
//             }
//         }

//         stage('Deploy to GKE') {
//             agent any
//             steps {
//                 dir('./videoservicejs') {
//                     sh "sed -i 's/twitch2:latest/videoservicejs:${env.BUILD_ID}/g' deployment.yaml"
//                     step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: 'twitch2', verifyDeployments: true])
//                 }
//             }
//         }
        
        
                stage('Code quality') {
            agent any
            steps {
                dir('./videoservicejs') {
                    sh '''
                        sonar-scanner.bat -D"sonar.projectKey=Twitch2" -D"sonar.sources=." -D"sonar.host.url=http://localhost:8079" -D"sonar.login=b39b56977cccd59ebb8aa23581c7575f9f4a70ce"
                        ''' 
                                }
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
// } 
}
