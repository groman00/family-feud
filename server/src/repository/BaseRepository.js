class BaseRepository {

  constructor(model) {
    this.model = model;
  }

  async createWithFields(fields) {
    const model = await this.model.build(fields);    
    await model.save();
    return model;    
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

  updateWithFields(update, fields) {
    return this.model.update(update, {
      where: fields,
    });    
  }
}

module.exports = BaseRepository;
