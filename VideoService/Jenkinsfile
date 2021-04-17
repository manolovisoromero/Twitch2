pipeline {
    agent { docker { image 'maven:3.3.3' } }
        tools { 
        jdk 'OpenJDK-11' 
        nodejs "node"
    }
    stages {
       stage('Initialize'){
        steps {
               echo 'initialize...'
        }
        
        }

         stage ('Build') {
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
