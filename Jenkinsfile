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
         stage('Build') {
             steps {
                  sh 'ls -l'
             }
         }
         stage('Deploy'){
             steps{
                 sh 'echo done'
             }
         }
     }
 }