# retail-order-process-jwt-kafka-mongodb

** order-api **
 Spring boot project with JWT token based authentication to create and fetch orders and also publish order to kafka.
 
** order-process-api ** 
 Spring boot project to listen to the kafka topic and update the order status to processed.
 
**order-mgmt-ui **
 Angular Application to place and view the orders.
