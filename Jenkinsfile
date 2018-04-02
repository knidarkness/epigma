 pipeline{
    agent {
         docker {
             image 'node:carbon'
             args '-p 3000:3000 -e npm_config_cache=npm-cache -e HOME=. -u root:root -v /var/lib/jenkins/workspace/myworkspace:/tmp/' +
                         ' -v /var/lib/jenkins/.ssh:/root/.ssh'

         }
     }
     stages{
         stage('Detect branch'){
            steps{
                println("now parsing branch name:"+BRANCH_NAME)
            }
         }
         stage('Pull'){
             steps{
                 git 'git@github.com:knidarkness/epigma.git'
             }
         }
         stage('Build & Test') {
             steps {
                  sh 'cd site && npm install && npm test'
             }
         }
         stage('Deploy'){
             steps{
                script{
                    if (BRANCH_NAME == 'dev'){
                        sh 'echo "done dev"'
                    } else if (BRANCH_NAME == 'master'){
                        sh 'echo "done master"'
                    }
                }
             }
         }
     }
 }