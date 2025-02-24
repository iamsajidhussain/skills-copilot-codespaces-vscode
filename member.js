function skillsMember() {
    return {
        name: '',
        skills: [],
        addSkill: function(skill) {
            this.skills.push(skill);
        },
        getSkills: function() {
            return this.skills;
        }
    };
} 