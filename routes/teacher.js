const Teacher = require('../models/teachers.model');
const router = require('express').Router();

router.route('/add').post((req, res)=>{
    const staff_no = req.body.staff_no;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const level = req.body.level;
    const class_held = req.body.class_held;

    const newTeacher = new Teacher({
        staff_no,
        firstname,
        lastname,
        level,
        class_held
    });
    console.log(newTeacher);
    newTeacher.save()
    .then(()=>res.json(`new teacher ${lastname} added successfully`))
    .catch(()=>{res.status(400).json('Error adding teacher'); console.log(error)});
});

router.route('/update/:id').post((req, res)=>{
    Teacher.findById(req.params.id)
    .then(staff=>{
        staff.staff_no = req.body.staff_no;
        staff.firstname = req.body.firstname;
        staff.lastname = req.body.lastname;
        staff.level = req.body.level;
        staff.class_held = req.body.class_held;

        staff.save()
        .then(()=>res.json(`staff ${lastname} updated successfully`))
        .catch(()=>{res.status(400).json('Error updating staff'); console.log(error)});
    })
    .catch(()=>{res.status(400).json('Error finding staff to update'); console.log(error)});
    
});

router.route('/').get((req, res)=>{
    Teacher.find()
    .then(staff=>{res.json(staff)})
    .catch(()=>{res.status(400).json('Error finding all staff'); console.log(error)});
});

router.route('/:id').get((req, res)=>{
    Teacher.findById(id)
    .then(staff=>{res.json(staff)})
    .catch(()=>{res.status(400).json('Error finding staff'); console.log(error)});
});

router.route('/delete/:id').delete((req, res)=>{
    Teacher.findByIdAndDelete(req.params.id)
    .then(()=>{res.json(`Staff deleted successfully`)})
    .catch(()=>{res.status(400).json('Error deleting staff'); console.log(error)});
});

module.exports = router;