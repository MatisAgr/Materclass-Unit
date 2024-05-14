<?php
require_once 'models/Category.php'; 
require_once 'models/Database.php'; 

use Masterticket\Category;
use Masterticket\Database;
use PHPUnit\Framework\TestCase;

class CategoryTest extends TestCase {
    public function testCreateEvent() {
        $dbModelMock = $this->getMockBuilder(Database::class)
                            ->getMock();

        $category = new Category($dbModelMock);
        $category_name = "Test Category";

        $pdoStatementMock = $this->getMockBuilder(PDOStatement::class)
                                 ->disableOriginalConstructor()
                                 ->getMock();

        $pdoStatementMock->expects($this->once())
                         ->method('bindValue')
                         ->with(':col1', $category_name, PDO::PARAM_STR);

        $pdoStatementMock->expects($this->once())
                         ->method('execute');

        $pdoMock = $this->getMockBuilder(PDO::class)
                        ->disableOriginalConstructor()
                        ->getMock();

        $pdoMock->expects($this->once())
                ->method('prepare')
                ->willReturn($pdoStatementMock);

        $dbModelMock->expects($this->once())
                    ->method('connect')
                    ->willReturn($pdoMock);

        $category->createEvent($category_name);
    }

    public function testGetEventById() {
            $dbModelMock = $this->getMockBuilder(Database::class)
                                ->getMock();
    
            $category = new Category($dbModelMock);
    
            $category_id = 1;
    
            $pdoStatementMock = $this->getMockBuilder(PDOStatement::class)
                                     ->disableOriginalConstructor()
                                     ->getMock();
    
            $pdoStatementMock->expects($this->once())
                             ->method('bindValue')
                             ->with(':col1', $category_id, PDO::PARAM_STR);
    
            $fetchResult = ['category_id' => $category_id, 'category_name' => 'Test Category']; // Simuler les données retournées par fetch()
            $pdoStatementMock->expects($this->once())
                             ->method('fetch')
                             ->willReturn($fetchResult);
    
            $pdoMock = $this->getMockBuilder(PDO::class)
                            ->disableOriginalConstructor()
                            ->getMock();
    
            $pdoMock->expects($this->once())
                    ->method('prepare')
                    ->willReturn($pdoStatementMock);
    
            $dbModelMock->expects($this->once())
                        ->method('connect')
                        ->willReturn($pdoMock);
    
            $result = $category->getEventById($category_id);
            $this->assertEquals($fetchResult, $result);
    }

    public function testGetAllEvents() {
        $dbModelMock = $this->getMockBuilder(Database::class)
                            ->getMock();

        $category = new Category($dbModelMock);

        $mockedResults = [
            ['event_id' => 1, 'event_name' => 'Event 1'],
            ['event_id' => 2, 'event_name' => 'Event 2']
        ];

        $pdoStatementMock = $this->getMockBuilder(PDOStatement::class)
                                 ->disableOriginalConstructor()
                                 ->getMock();

        $pdoStatementMock->expects($this->once())
                         ->method('execute');

        $pdoStatementMock->expects($this->once())
                         ->method('fetchAll')
                         ->willReturn($mockedResults);

        $pdoMock = $this->getMockBuilder(PDO::class)
                        ->disableOriginalConstructor()
                        ->getMock();

        $pdoMock->expects($this->once())
                ->method('prepare')
                ->willReturn($pdoStatementMock);

        $dbModelMock->expects($this->once())
                    ->method('connect')
                    ->willReturn($pdoMock);

        $result = $category->getAllEvents();

        $this->assertEquals($mockedResults, $result);
    }
}

