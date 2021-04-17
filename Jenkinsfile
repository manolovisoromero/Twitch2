pipeline {
     agent {
                docker { image 'node:14.16.0-alpine'
                       //image 'maven:3.3.3'
                       }
            }
        tools { 
        jdk 'OpenJDK-11' 
        nodejs 'NodeJS'
    }
    stages {
       stage('Build VideoServiceJS'){
                
        steps {
               sh '''
               cd VideoServiceJS
               node --version
               npm install
               '''

                }
        }
         stage('Test VideoServiceJS'){
             steps { 
                 sh ''' 
                 cd VideoServiceJS
                 npm test
                
                 '''}
         }

         stage ('Build  VideoService') {
                  agent {
                docker { 
                       image 'maven:3.3.3'
                       }
            }
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
