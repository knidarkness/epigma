 pipeline{
    agent {
         docker {
             image 'node:carbon'
             args '-p 3000:3000 -e npm_config_cache=npm-cache -e HOME=. -u root:root -v /var/lib/jenkins/workspace/myworkspace:/tmp/' +
                         ' -v /var/lib/jenkins/.ssh:/root/.ssh'

         }
     }
     stages{
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
                 sh 'ssh ubuntu@52.47.126.164 /usr/epigma/deploy.sh'
             }
         }
     }
 }