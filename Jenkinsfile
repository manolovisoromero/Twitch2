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
            JAVA_HOME = '/opt/java/openjdk/bin'
        }
    stages {
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
        
        
        
//         stage('Code quality') {
//                 agent { docker { image nodeImage } }
//                 def scannerHome = tool 'sonarscanner'
//             steps {
//                     withSonarQubeEnv('sonar') {

//                 sh '''
//                         ${scannerHome}/bin/sonar-scanner \
//                           -Dsonar.projectKey=Twitch2 \
//                           -Dsonar.sources=. \
//                           -Dsonar.host.url=http://localhost:8079 \
//                           -Dsonar.login=b39b56977cccd59ebb8aa23581c7575f9f4a70ce                
                
//                 '''}
//             }
//         }
            
            stage('SonarQube analysis') {
                     agent { docker { image mavenImage } }
    steps{
        script {
            scannerHome = tool 'sonarscanner';
        }
        withSonarQubeEnv('sonar') {
                
                 sh '''                          
                            /var/jenkins_home/sonar-scanner-4.6.2.2472-linux/bin/sonar-scanner

                
                '''
                
        }
    }
}
            

            
//                                      sonar-scanner \
//                            -Dsonar.projectKey=Twitch2 \
//                            -Dsonar.sources=. \
//                            -Dsonar.host.url=http://localhost:8079 \
//                            -Dsonar.login=b39b56977cccd59ebb8aa23581c7575f9f4a70ce  
            

        
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

