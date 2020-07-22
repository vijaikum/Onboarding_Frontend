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
   
}
