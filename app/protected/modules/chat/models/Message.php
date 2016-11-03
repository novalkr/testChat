<?php

/**
 * This is the model class for table "{{message}}".
 *
 * The followings are the available columns in table '{{message}}':
 * @property integer $id
 * @property integer $userId
 * @property string $message
 * @property string $dateTime
 * @property integer $parentId
 */
class Message extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Message the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{message}}';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			//array('dateTime', 'required'),
			array('userId, parentId', 'numerical', 'integerOnly'=>true),
			array('message', 'length', 'max'=>110),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, userId, message, dateTime, parentId', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'userId' => 'User',
			'message' => 'Message',
			'dateTime' => 'Date Time',
			'parentId' => 'Parent',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('userId',$this->userId);
		$criteria->compare('message',$this->message,true);
		$criteria->compare('dateTime',$this->dateTime,true);
		$criteria->compare('parentId',$this->parentId);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

        public function getLast($after = 0) {
            $after = empty($after)?0:((int)$after);        
            return $this->findAll(               
                array(  
                    'condition' => 't.id > :id',
                    'order'=>'t.dateTime DESC',
                    'limit' => 15,
                    'params' => array(':id' =>$after),
                )
            );
        }
}