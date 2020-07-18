node {
    def app

    stage('Clone repository') {
     checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("vijkum/onboarding:react")
    }

    stage('Test image') {
        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("react")
            app.push("latest")
        }
    }
    
    stage('Test Kubernetes') {
        withKubeConfig(credentialsId: 'kubeconfig', serverUrl: 'https://ninjadona-cluster-dns-946b89d4.hcp.centralus.azmk8s.io:443') {
            sh 'kubectl config view'
        }
    }
}
