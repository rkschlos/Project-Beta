# CarCar

Team:

* Person 1 - Rachael - Sales
* Person 2 - Allisha - Service

## Design

The inventory is the aggregate root. The sales and services are microservices. When getting data from inventory, we made sure to use value object models as to not change the state of the models in the inventory. This treatment of inventory allowed us to keep our usage of the data from modifying the inventory. It helped keep our microservices separate. 

## Service microservice

There are 3 models that make up the service microservice. I made a ServiceAppointment model to setup the infrastructure for creating an appointment and appointment details. It has the information for an appointment including the customer/owner name, the vin # of the automobile(I had previously set it to unique but realized it couldn't be unique because customers could have multiple service appointments with the same automobile), the date and time of the service appointment(I changed the formatting in the React components for the date to be M/DD/YYYY and time to be H:MM AM/PM with a timezone of PST), a technician field which I made into a foreign key so that it could pull data from the Technician model, a TextField for the reason property, a Boolean field to check if the customer bought the vehicle from the dealership to receive VIP treatment, and another Boolean field to be able to complete a service appointment when you click on the 'complete' button. I made a Technician model to be able to have a customer choose a technician from a dropdown when they make a service appointment. Lastly, I created an AutomobileVO model to be able to handle an automobile as a value object from the inventory microservice. I added the vin property because that's how the service microservice would be integrated with the inventory microservice. I did make the vin property for the AutomobileVO model unique because there should only be one vin per automobile unlike appointments for the same automobile. The service microservice needs to be able to pull automobiles from the inventory microservice to do things with specific automobiles such as look up its service history, check if it was bought at the dealership, etc. The automobile value object model is how the service microservice integrates with the inventory microservice by polling for its data for automobiles to be used in service components.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
