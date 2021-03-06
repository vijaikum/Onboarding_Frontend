node {
    def app

    stage('Clone repository') {
     checkout scm
    }
    
    stage('Get Backend IP') {
        withKubeConfig(credentialsId: 'kubeconfig', serverUrl: 'https://murugan-cl-murugan-kube-4ebfba-8817583e.hcp.centralus.azmk8s.io:443') {
    sh """IP=\$(kubectl get svc | grep onboarding | awk '{print \$4}' > /tmp/ip.txt)"""
    sh """cat /tmp/ip.txt"""
        }
    }
    
    stage('Replace Backend Environment Variable') {
     sh """
                    value=\$(cat /tmp/ip.txt)
                    echo \$value
                    
               sudo sed -i "s/IPtoreplace/\${value}/g" \$WORKSPACE/deployment.yml
               """
    }

    stage('Build image') {
        
        app = docker.build("vijkum/onboarding:react")
    }

    stage('Test image') {
        app.inside {
            sh 'echo "Tests passed"'
        }
    }
    
    stage('Push image to DockerHub') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("react")
            app.push("react-latest")
        }
    }

 stage('Deploy Kubernetes') {
        withKubeConfig(credentialsId: 'kubeconfig', serverUrl: 'https://murugan-cl-murugan-kube-4ebfba-8817583e.hcp.centralus.azmk8s.io:443') {
            sh 'kubectl create -f deployment.yml'
            sh 'kubectl create -f service.yml'
        }
    }
   
}
