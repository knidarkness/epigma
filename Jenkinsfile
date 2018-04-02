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
         stage('Build & Test') {
             steps {
                  sh 'cd site && npm install'
                  sh 'npm i -g mocha'
                  sh 'cd site && npm test'
             }
         }
         stage('Deploy'){
             steps{
                script{
                    if (BRANCH_NAME == 'dev'){
                        sh 'echo "done dev"'
                    } else if (BRANCH_NAME == 'master'){
                        sh 'echo "done master"'
                        sh 'ssh ubuntu@52.47.126.164 "cd /usr/epigma/epigma; sudo docker-compose down; cd /usr/epigma/; sudo rm -rf /usr/epigma/epigma; sudo git clone https://github.com/knidarkness/epigma.git; cd /usr/epigma/epigma; sudo docker-compose up --build -d"'
                    }
                }
             }
         }
     }
 }