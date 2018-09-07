/*
1- Clone data from the Shippers table to the NewShippers table.
*/

Select *
into NewShippers
From Shippers



/*
2- Find the set of products (Product Name) and maximum value of units in stock for each one, 
	which is in the range from 25 to 50. 
	Represent records from the min to max value of units in stock.
*/

Select ProductName, UnitsInStock
From Products
Where UnitsInStock >= 25 and UnitsInStock <= 50
order by UnitsInStock


/*
3-	Get the list of total quantities of ordered products which consists of: total quantity ordered in Germany 
	and the total quantiy* 0.7% of products ordered in Sweden. (Result should contain 2 rows)
*/


Select Suppliers.Country, Sum([Order Details].Quantity) as Quantity
    from Suppliers join [Order Details] on Suppliers.SupplierID = [Order Details].ProductID
	where Country like '%Germany%'
	group by Country
union
Select Suppliers.Country, Sum([Order Details].Quantity)*0.007 as Quantity
    from Suppliers join [Order Details] on Suppliers.SupplierID = [Order Details].ProductID
	where Country like '%Sweden%'
	group by Country


/*
4-	Find the list of different countries in Employees and Customers tables.
*/

Select Country
From Customers 
except
Select Country 
from Employees


/*
5-	Find the list of the same Postal Codes between Suppliers and Employees tables.
*/

Select PostalCode
From Customers
intersect
Select PostalCode
From Employees


/*
6-	Find the top region from which sales specialists were hired.
*/



Select top 1 (Region) as TopSalesSpecialists
From Employees
Where Title like '%Sales%'




/*
7-	Get the list of products: with a price < 50.00 with a discountinued flag and < 50  without a discountinued flag.
*/

Select ProductName, UnitPrice, Discontinued
From Products
where UnitPrice < 50
order by Discontinued



/*
8-	Create new table NewProducts based on the Products table with only discountinued products. 
	Compare data sets between Products and NewProducts tables. (Check that only discountinued products are inserted).
*/

Select *
into MyNewProducts
from Products		
where Discontinued = 1

