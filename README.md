# CarCar

Team:

* Person 1 - Rachael - Sales
* Person 2 - Allisha - Service

## Design


The sales, services and inventory are microservices and bounded contexts. When getting data from inventory, we made sure to use value object models as to not change the state of the models in the inventory. This treatment of inventory allowed us to keep our usage of the data from modifying the inventory. It helped keep our microservices separate. 

Rachael's excalidraw link: https://excalidraw.com/#json=HxQW4w8S5Op8hvaMrGfgl,FgaOb_z5531qos_eM1W4UQ

Allisha - DDD:

https://excalidraw.com/#json=iufzAuU4Zt1FlwYCVcTk5,lHIwZETjckZtZwYebIta9Q

## Service microservice

There are 3 models that make up the service microservice. I made a ServiceAppointment model to setup the infrastructure for creating an appointment and appointment details. It has the information for an appointment including the customer/owner name, the vin # of the automobile(I had previously set it to unique but realized it couldn't be unique because customers could have multiple service appointments with the same automobile), the date and time of the service appointment(I changed the formatting in the React components for the date to be M/DD/YYYY and time to be H:MM AM/PM, I originally had a timezone of PST set but decided to set the time to the time on the local system rather than convert to UTC, so no timezone needed), a technician field which I made into a foreign key so that it could pull data from the Technician model, a TextField for the reason property, a Boolean field to check if the customer bought the vehicle from the dealership to receive VIP treatment, and another Boolean field to be able to complete a service appointment when you click on the 'complete' button. I made a Technician model to be able to have a customer choose a technician from a dropdown when they make a service appointment. Lastly, I created an AutomobileVO model to be able to handle an automobile as a value object from the inventory microservice. I added the vin property because that's how the service microservice would be integrated with the inventory microservice. I did make the vin property for the AutomobileVO model unique because there should only be one vin per automobile unlike appointments for the same automobile. The service microservice needs to be able to pull automobiles from the inventory microservice to do things with specific automobiles such as look up its service history, check if it was bought at the dealership, etc. The automobile value object model is how the service microservice integrates with the inventory microservice by polling for its data for automobiles to be used in service components.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

My microservice, sales has 4 models. SalesPerson, Customer, SaleRecord and AutomobileVO. AutomobileVO object represents the integration point with the inventory microservice. Because each microservice in this project is a bounded context, my microservice does not “own” or have stewardship over the Inventory/Automobile data. In order to respect this boundary and make sure the Inventory/Automobile data is not mutable within the sales context, an AutomobileVO value object needed to be made. It accesses the data from the Automobile inventory in the Inventory microservice via polling, but has no way to change it. 

The models of SalesPerson and Customer are pretty straightforward, with fields like “name” “employee-number” or “address” as properties. 

The SalesRecord model was a bit more complex, because it had 3 foreign key relationships. The first was to customer, a one-to-many relationship because a sales record can only have one customer, but a customer can have have many sales records. The second foreign key property was Employee, and it is also one-to- many for the same reasons as the customer. The AutomobileVO relationship was a bit trickier for me to decide on, but I ultimately thought that perhaps the same vehicle could be sold more than once, and so I also decided it was a one-to-many relationship as well. I set all of these to cascade=protect, because I did not want the referenced object to get deleted if the sale record was deleted. The SalesRecord also contained the property of sale price. 

This set up allowed for both my partner and I to use data from the Inventory service cleanly, without mutating it in anyway, and it helped keep our microservices from influencing each other in an unintended way. 