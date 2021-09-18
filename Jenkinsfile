pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "sudo npm install"
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rm -rf /var/www/fundoo-notes-frontend"
                sh "sudo cp -r /var/lib/jenkins/workspace/FundooNotesFrontEnd/build/ /var/www/fundoo-notes-frontend/"
            }
        }
    }
}