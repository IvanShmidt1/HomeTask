// Insert Users
db.users.insertMany(
[
	{
		"FirstName": "Ivan",
		"LastName" : "Petrovich",
		"MiddleName": "J",
		"DateOfBirth": ISODate("1973-12-29T00:00:00Z")
	},
	{
		"FirstName": "Pavel",
		"LastName" : "Pavlovich",
		"MiddleName": "Ivanovich",
		"DateOfBirth": ISODate("1972-12-29T00:00:00Z")
	},
	{
		"LastName" : "Dondarion"
	},
	{
		"FirstName": "Anastasiia",
		"LastName" : "Pavlovna",
		"MiddleName": "Polyakova"
	},
	{
		"FirstName": "Alexander",
		"LastName" : "Krutykov",
		"MiddleName": "Mot"
	},
	{
		"FirstName": "Bernard",
		"LastName" : "Westworld",
		"DateOfBirth": ISODate("1983-12-29T00:00:00Z")
	},
	{
		"FirstName": "Klim",
		"LastName" : "Lomovich",
		"DateOfBirth": ISODate("1993-12-29T00:00:00Z")
	}
]
)

//Insert Universities

db.universities.insertMany([
    {
        "name":"MIT",
        "accreditation":"4",
        "address": {
           "address1" : "77 Massachusetts Ave",
           "city" : "Cambridge",
           "state" : "MA",
           "zipcode" : "02139",
           "coordinates" : [
            50.022547,
            36.22694] }
    },
{
        "name":"Oxford",
        "accreditation":"3",
        "address": {
           "address1" : "77 New states Ave",
           "city" : "Cambridge",
           "state" : "AN",
           "zipcode" : "7257"
}
    },
    {
        "name":"East Carolina University",
        "address": {
           "address1" : "E 5th St",
           "city" : "Greenville",
           "state" : "NC",
           "zipcode" : "27858",
          }
    }
])

// Insert courses

db.courses.insertMany([{
    "name" : "Course C1",
    "university_id:" : ObjectId("5841e50b08acf4a103c263a3"),
    "users" : [ 
        {
            "user_id" : ObjectId("5841e1b808acf4a103c2639c"),
            "role" : "instructor"
        }, 
        {
            "user_id" : ObjectId("5841e1b808acf4a103c2639d"),
            "role" : "instructor"
        }, 
        {
            "user_id" : ObjectId("5841e1b808acf4a103c2639e"),
            "role" : "student"
        }, 
        {
            "user_id" : ObjectId("5841e1b808acf4a103c2639f"),
            "role" : "student"
        }, 
        {
            "user_id" : ObjectId("5841e1b808acf4a103c263a0"),
            "role" : "student"
        }, 
        {
            "user_id" : ObjectId("5841e1b808acf4a103c263a2"),
            "role" : "student"
        }
    ]
},
    
    {
    "name": "Course C2",
    "university_id:": ObjectId("5841e50b08acf4a103c263a4"),
    "users":[
    {
    "user_id": ObjectId("5841e1b808acf4a103c263a1"),
        "role": "instructor"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c263a2"),
        "role": "admin"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c2639f"),
        "role": "student"
    }
    ]
    },
    
    {
    "name": "Course C3",
    "university_id:": ObjectId("5841e50b08acf4a103c263a4"),
    "users":[
    {
    "user_id": ObjectId("5841e1b808acf4a103c263a1"),
        "role": "student"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c263a2"),
        "role": "student"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c2639f"),
        "role": "student"
    }
    ]
    },
    
    {
    "name": "Course C4",
    "university_id:": ObjectId("5841e50b08acf4a103c263a3"),
    "users":[
    {
    "user_id": ObjectId("5841e1b808acf4a103c2639c"),
        "role": "student"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c2639d"),
        "role": "student"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c2639e"),
        "role": "instructor"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c2639f"),
        "role": "instructor"
    },
    {
    "user_id": ObjectId("5841e1b808acf4a103c263a0"),
        "role": "instructor"
    },
    ]
    }
    ]
)

//
//a.	Select all universities. Show name and accreditation
//    
db.getCollection('universities').find({},{name: 1, accreditation: 1, _id: 0 });


//
//b.	Select university without coordinates. Show only Address information. 
//
db.universities.find(
    {
        "address.coordinates":
        {
            $exists:false
        }
     },
     {
         address:1, _id:0
      }
);


//
//c.	Select university with State = “MA” and zipcode not equal to “27897”. Show id, name, state, zipcode
//
db.universities.find(
    {
        "address.state": "MA", 
        "address.zipcode": 
            {
                $nin: ["27897"]
             }
     },
     {
         _id:1, 
         name:1, 
         "address.state":1, 
         "address.zipcode":1
     }
)


//
//d.	Select users with Date of Birth more than (>) 1980 year and less than current date. Show only Date of Birth 
//
db.users.find(
     {
         "DateOfBirth": 
            {
                $gt: new ISODate("1980-01-01T00:00:00.000Z")
             }
      }, 
      {
          DateOfBirth:1, _id:0
       }
);


//
//e.	Change course name and delete all other information (university_id, users) for course, which contains only students. 
//
db.courses.update(
       {
           "users.role": 
            {
                $nin: ["instructor", "admin"]
            }
       }, 
       {$set: 
           {
               "name": "Pervaki"
            }
        }
);
        
        
db.courses.update(
        {
            name: "Pervaki"
         }, 
         {
             $unset: 
             {
                 "iniversities_id:": 1, "users": 1
             }
         }
);

//
//f.	Select courses with max number of users. Show course name, user roles, amount of users. 
//
db.courses.find().sort({users:-1}).limit(1)

//
//g.	*Select user with the longest MiddleName. Show _id, MiddleName, length. 
//
db.users.aggregate(
         [
         {
             $project:
             {
                 "MiddleName": 1,
                 "lenght": 
                 {
                     $strLenCP: "$MiddleName" 
                  }
              }
          },
          {
              $match: 
              {
                  MiddleName: 
                  {
                      $exists:true
                   }
               }
           },
           {
               $sort: 
               {
                   "lenght":-1
                }
           },
           {
               $limit: 1
            }
         ]
);

//
//h.	Update only the course name, which contains every user role. 
//
db.courses.updateMany(
            {
                $and: 
[
                {
                    "users.role": "instructor"
                }, 
                {
                    "users.role": "admin"
                }, 
                {
                    "users.role": "student"
                }
]
            }, 
            {
                $set: 
                {
                    "name": "Kafedra"
                }
            }
);


//
//i.	Replace User document with Name = “Pavel” (insert your values and pay attention for the new structure. Use .find() before replacement and compare values after)
//
db.users.find(
            {
                FirstName: "Pavel"
            }, 
            {
            }
);

db.users.replaceOne(
            {
                "FirstName": "Pavel"
            },
            {
                "FirstName": "NewPavel", 
                "LastName": "Makasinov", 
                "MiddleName": "MetropolitGudinovich", 
                "DateOfBirth": ISODate("2018-01-25T00:00:00Z")
            },
            {
                upsert: true
            }
);
    
db.users.find(
            {
                FirstName: "NewPavel"
            }
);
//
//j.	Delete user which has only LastName by 2 ways (use delete()and remove() commands)(i.e. MiddleName, Date of Birth, First Name are null).
//

db.users.deleteOne(
    {
        "FirstName": 
        {
            "$in": [null], 
            $exists: false
         }
     }, 
     {
         "MiddleName": 
         {
             "$in" : [null], 
             $exists: false
          }
      }, 
      {
          "DateOfBirth": 
          {
              "$in" : [null], 
              $exists: false
          }
       }, 
       {
           "LastName": 
           {
               "$in" : [null], 
               $exists: true
           }
        }
);
        


db.users.remove( 
        {
          "DateOfBirth": 
          {
              "$in" : [null], 
              $exists: false
          }
        }
)

