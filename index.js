const fs = require('fs');
const path = require('path');

function saveData(dataPath, folderName, overwrite) {
  let dirPath = path.join(__dirname, folderName);
  if (fs.existsSync(dirPath)) {
    console.log("Folder już istnieje");
    } else {
    console.log("Folder jeszcze nie istnieje, zaraz stworzę");
    fs.mkdir(dirPath, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Stworzono folder: ", folderName);
      }
    });
  }

  fs.readFile(dataPath, "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let users = JSON.parse(data);
      fs.readdir(dirPath, function (err) {
        if (err) {
          console.log(err);
        } else {
          users.forEach((person) => {
            let personNamesArray = person.name.split(" ");
            let prefix = personNamesArray[0].includes(".");
            if (prefix) {
              personNamesArray.splice(0, 1);
            }
            let surname = personNamesArray.slice(1).join(" ");
            let personData = `Name: ${personNamesArray[0]}\nSurname: ${surname}\nStreet: ${person.address.street}\nZip Code: ${person.address.zipcode}\nCity: ${person.address.city}\nPhone: ${person.phone}`;
            let personNamesDashes = personNamesArray.join("-");
            let filePath = path.join(dirPath, `${person.id}-${personNamesDashes}.txt`);
            if (fs.existsSync(filePath) && !overwrite) {
              console.log("Plik już istnieje i nie może zostać nadpisany");
            } else {
              fs.writeFile(filePath, personData, function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Stworzono plik ");
                }
              });
            }
          });
        }
      });
    }
  });
};

saveData("data/2-read-write-users.json", "users", true);





// const fs = require("fs");
// const path = require("path");

// function saveData(jsonPath, folderName, overwrite) {
//   const dirPath = path.join(__dirname, folderName);
//   if (fs.existsSync(dirPath)) {
//     console.log("Folder już istnieje");
//   } else {
//     console.log("Folder jeszcze nie istnieje");
//     fs.mkdir(dirPath, function (err) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Stworzono folder");
//       }
//     });
//   }
//   fs.readFile(jsonPath, "utf8", function (err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       let users = JSON.parse(data);
//       fs.readdir(dirPath, function (err) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("czytam folder");
//           users.forEach((person) => {
//             let personNamesArray = person.name.split(" ");
//             let prefix = personNamesArray[0].includes(".");
//             if (prefix) {
//               personNamesArray.splice(0, 1);
//             }
//             let surname = personNamesArray.slice(1).join(" ");
//             let personData = `Name: ${personNamesArray[0]}\nSurname: ${surname}\nStreet: ${person.address.street}\nZip Code: ${person.address.zipcode}\nCity: ${person.address.city}\nPhone: ${person.phone}`;
//             let personNamesDashes = personNamesArray.join("-");
//             let filePath = path.join(dirPath, `${person.id}-${personNamesDashes}.txt`);
//             if (fs.existsSync(filePath) && !overwrite) {
//               console.log("plik już istnieje i nie może zostać nadpisany");
//             } else {
//               fs.writeFile(filePath, personData, function (err) {
//                 if (err) {
//                   console.log(err);
//                 } else {
//                   console.log("stworzono plik");
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
//   });
// };

// saveData("2-read-write-users.json", "users", true);