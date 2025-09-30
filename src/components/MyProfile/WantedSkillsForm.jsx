import { useState } from 'react'

const WantedSkillsForm = (props) => {
    const initialState = {
        skillName: '',
        category: '',
        skillLevel: '',
        type:'wanted',
    }

    const [formData, setFormData] = useState(
        props.selected ? props.selected : initialState
    )

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (props.selected) {
            // console.log("this is the form data UPDATE",formData)
            props.handleUpdatePet(formData, props.selected._id)
        } else {
            props.handleAddPet(formData)
        }
    }
    return (
    <div>
        <form onSubmit={handleSubmit}></form>
            <label htmlFor="skillName"> Skill Name </label>
                <input
                    id="skillName"
                    name="skillName"
                    value={formData.skillName}
                    onChange={handleChange} 
                    required
                />
            <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                <option value="">-- Select a category --</option>
                {[
                    'Technology', 'Arts & Crafts', 'Music', 'Languages', 'Sports & Fitness',
                    'Cooking', 'Business', 'Writing', 'Photography', 'Gardening',
                    'Repair & Maintenance', 'Teaching', 'Health & Wellness', 'Other'
                ].map((cat) => (
                    <option key={cat} value={cat}>
                    {cat}
                    </option>
                ))}
                </select>
            <label htmlFor="skillLevel">Level of Expertise</label>
                <select
                    id="skillLevel"
                    name="skillLevel"
                    value={formData.skillLevel}
                    onChange={handleChange}
                    required
                >
                <option value="">-- Select a level of competency/expertise --</option>
                {[
                    'Beginner', 'Intermediate', 'Advanced', 'Expert'
                ].map((cat) => (
                    <option key={cat} value={cat}>
                    {cat}
                    </option>
                ))}
                </select>

            
        </div>
)};

export default WantedSkillsForm;