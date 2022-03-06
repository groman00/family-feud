// Todo Make this an abstract class or interface.
class BaseRepository {

  constructor(model) {
    this.model = model;
  }

  findAllByFields(fields) {
    return this.model.findAll({
      where: fields,
    }); 
  }

  findOneByFields(fields) {
    return this.model.findOne({
      where: fields,
    });    
  }

  findAll() {
    return this.model.findAll();
  }
  
  async createWithFields(fields) {
    const model = await this.model.build(fields);    
    await model.save();
    return model;    
  }
}

module.exports = BaseRepository;
