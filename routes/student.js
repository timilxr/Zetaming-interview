const Student = require('../models/students.model');
const router = require('express').Router();

router.route('/add').post((req, res)=>{
    const student_no = req.body.student_no;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const clas = req.body.clas;

    const newStudent = new Student({
        student_no,
        firstname,
        lastname,
        clas
    });
    newStudent.save()
    .then(()=>res.json(`new student ${lastname} added successfully`))
    .catch(()=>{res.status(400).json('Error adding student'); console.log(error)});
});

router.route('/update/:id').post((req, res)=>{
    Student.findById(req.params.id)
    .then(student=>{
        student.student_no = req.body.student_no;
        student.firstname = req.body.firstname;
        student.lastname = req.body.lastname;
        student.clas = req.body.clas;

        student.save()
        .then(()=>res.json(`student ${lastname} updated successfully`))
        .catch(()=>{res.status(400).json('Error updating student'); console.log(error)});
    })
    .catch(()=>{res.status(400).json('Error finding student to update'); console.log(error)});
    
});

router.route('/').get((req, res)=>{
    Student.find()
    .then(student=>{res.json(student)})
    .catch(()=>{res.status(400).json('Error finding students'); console.log(error)});
});

router.route('/:clas').get((req, res)=>{
    Student.find({clas: req.params.clas})
    .then(student=>{res.json(student)})
    .catch(()=>{res.status(400).json('Error finding students'); console.log(error)});
});

router.route('/:id').get((req, res)=>{
    Student.findById(req.params.id)
    .then(student=>{res.json(student)})
    .catch(()=>{res.status(400).json('Error finding students'); console.log(error)});
});

router.route('/delete/:id').delete((req, res)=>{
    Student.findByIdAndDelete(req.params.id)
    .then(()=>{res.json(`Student deleted successfully`)})
    .catch(()=>{res.status(400).json('Error deleting student'); console.log(error)});
});

module.exports = router;