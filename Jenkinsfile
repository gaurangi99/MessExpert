pipeline {

    agent any

    environment {
        PASS = credentials('registry-pass')
        IMAGE_BE="mebackend"
        IMAGE_FE="mefrontend"
        USER="shubhanshi"


    }

    stages {

        stage('Building jar for backend') {
            steps {
                sh 'pwd'
                sh './jenkins/build/mvn.sh mvn -B -DskipTests clean package'
            }

            post {
                success {
                   archiveArtifacts artifacts: 'poll/target/*.jar', fingerprint: true
                }
            }
        }

        stage('Testing the backend') {
            steps {
                sh 'pwd'
                sh './jenkins/test/mvn.sh mvn test'
            }

            post {
                always {
                    junit 'poll/target/surefire-reports/*.xml'
                }
            }
        }
        stage('Testing the frontend') {
                    steps {
                        sh 'pwd'
                        sh './jenkins/test/react.sh'
                    }

        //             post {
        //                 always {
        //                     junit 'target/surefire-reports/*.xml'
        //                 }
        //             }
                }




        stage('building docker images ') {
                    steps {
                        sh './jenkins/build/build.sh'
                    }
                }
        stage('Pushing to docker hub && removing the local mage') {
            steps {
                sh './jenkins/push/push.sh'
            }
        }

        stage('Ansible Deploy') {
                    steps {
                        ansiblePlaybook becomeUser: 'null',
                        extras: "-e user=$USER",
                        colorized: true,
                        installation: 'Ansible',
                        inventory: 'inventory',
                        playbook: 'deploy-playbook.yml',
                        sudoUser: 'null'

//                         sh 'echo "reached ansible" '
                    }
                }
    }
}
//dummy commit for github
