pipeline {
    agent { docker { image 'maven:3.3.3' } }
        tools { 
        jdk 'OpenJDK-11' 
        nodejs 'NodeJS'
    }
    stages {
       stage('Build VideoServiceJS'){
        steps {
               sh 'cd VideoServiceJS'
               sh 'npm install'
                }
        }
         stage('Test VideoServiceJS'){
             steps { sh 'npm test'}
         }

         stage ('Build  VideoService') {
            steps {
                sh ''' 
                cd ..
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
