PRE REQUIREMENTS:
- docker
- docker-compose
- docker swarm

PRE RUN:
- create service registry using: ` docker service create --name registry --publish published=5000,target=5000 registry:2`

HOW TO RUN:
- sh deploy.sh
- visit http://localhost:5500 and check if it return something
- run frontend if you didn't

SCALE UP:
change/add deploy key in docker-compose.yml

KNOWN ISSUES:
- wait 30 seconds for api service