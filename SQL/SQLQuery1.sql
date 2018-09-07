/*
1-	Update the Employees table, so it contains the HireDate values from 2014 till the current (2019) year
*/

UPDATE Employees
SET HireDate = DATEADD(year, 25, HireDate)
WHERE HireDate < '2014';



/*
2-	Delete records from the Products table where ReorderLevel values is equal to 30. 
*/

Alter table [dbo].[Order Detais]
drop constraint FK_Order_Details_Products

DELETE FROM Products
WHERE ReorderLevel = 30;



/*
3-	Get the list of data about employees: First Name, Last Name, Title, HireDate who was hired this year
*/

Select Title, FirstName, LastName
from Employees
order by Title;

/*
4-	Get the list of suppliers, which are located in USA and have a specified region.
*/

select *
from Suppliers
where Country = 'USA' and Region is not NULL



/*
5-	Get the amount of products that were delivered by each supplier (company), which have a discount from the Unit Price more than 10%. (order by companyid)
*/

Select Suppliers.CompanyName, Products.SupplierID, count([Order Details].Quantity) as Quantity
From Products 
inner join Suppliers
on Products.SupplierID = Suppliers.SupplierID
inner join [Order Details]
on Products.ProductID = [Order Details].ProductID
where Discount > 0.1 
group by Suppliers.CompanyName, Products.SupplierID
order by SupplierID



/*
6-	Get the top five product categories with the list of the most buyable products in European countries
*/

Select  top 5 Quantity,  Products.ProductName, Suppliers.Country
From Products 
inner join Suppliers
on Products.SupplierID = Suppliers.SupplierID
inner join [Order Details]
on Products.ProductID = [Order Details].ProductID
where Suppliers.Country IN ('Italy', 'Spain', 'UK', 'France', 'Germany', 'Sweden')
order by Quantity desc



/*
7-	Get the First Name, Last Name and Title of Managers and their subordinates.
*/

Select 
	e.Title as 'Subordinates Title',
	e.FirstName as 'Subordinates First Name', 
	e.LastName as 'Subordinates Last Name', 
	m.FirstName + ' '+m.LastName + ', ' + m.Title as 'Managers'
From Employees e
Left Outer join Employees m
on e.ReportsTo = m.EmployeeID 
where e.ReportsTo = (
												Select EmployeeID
												From Employees
												Where Title like '%Manager%'
											);