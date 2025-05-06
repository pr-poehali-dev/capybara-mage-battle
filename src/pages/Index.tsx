import { useState, useRef, useEffect } from "react");
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [battleLocation, setBattleLocation] = useState("");
  const [isBattleStarted, setIsBattleStarted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("Я тебя жду, загрузи изображение противника!");
  const [messageVisible, setMessageVisible] = useState(true);
  const [opponentType, setOpponentType] = useState<string | null>(null);
  const [isCapybara, setIsCapybara] = useState(false);
  const [superPowers, setSuperPowers] = useState<string[]>([]);
  const [battleProgress, setBattleProgress] = useState(0);
  const [isBattleWon, setIsBattleWon] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const locations = [
    "Огненные пустоши", 
    "Подводные пещеры", 
    "Заброшенный замок", 
    "Зачарованный лес",
    "Облачный город",
    "Кристальные горы"
  ];
  
  const possibleOpponents = [
    "человек", "кот", "собака", "птица", "дерево", "цветок", 
    "гора", "здание", "автомобиль", "пляж", "океан", "еда",
    "предмет", "игрушка", "фрукт", "робот", "инопланетянин"
  ];
  
  const allSuperPowers = [
    "Огненный шар", "Ледяной луч", "Телекинез", "Невидимость", 
    "Преобразование времени", "Молния", "Щит отражения", 
    "Призыв водного дракона", "Лианы-ловушки", "Вихрь песка",
    "Каменная кожа", "Психическая атака", "Гипноз", "Клонирование",
    "Взрыв света", "Темная воронка", "Облако ядовитого газа",
    "Лечебный поток", "Пространственный разлом", "Гравитационный удар"
  ];
  
  useEffect(() => {
    // Случайные сообщения пока игрок не загрузил изображение
    if (!userImage && !isBattleStarted) {
      const messages = [
        "Я тебя жду, загрузи изображение противника!",
        "Не бойся вызвать меня на магическую дуэль!",
        "Загрузи любое изображение, и мы начнем битву!",
        "Моя магия готова к испытанию!",
        "Выбери своего чемпиона и брось мне вызов!"
      ];
      
      const intervalId = setInterval(() => {
        setMessageVisible(false);
        setTimeout(() => {
          setMessage(messages[Math.floor(Math.random() * messages.length)]);
          setMessageVisible(true);
        }, 500);
      }, 5000);
      
      return () => clearInterval(intervalId);
    }
  }, [userImage, isBattleStarted]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
        setMessageVisible(true);
        
        // Симулируем распознавание изображения
        simulateImageRecognition();
      };
      reader.readAsDataURL(file);
    }
  };
  
  const simulateImageRecognition = () => {
    // Симулируем задержку распознавания
    setMessage("Анализирую противника...");
    
    setTimeout(() => {
      // Случайно определяем, является ли это капибарой (с вероятностью 10%)
      const isCapybaraOpponent = Math.random() <  0.1;
      setIsCapybara(isCapybaraOpponent);
      
      if (isCapybaraOpponent) {
        setMessage("Хм?! Это же... другая капибара?! Я не ожидала встретить родственника на поле боя!");
        setOpponentType("капибара");
      } else {
        // Случайно выбираем тип противника
        const randomOpponent = possibleOpponents[Math.floor(Math.random() * possibleOpponents.length)];
        setOpponentType(randomOpponent);
        setMessage(`Отличный выбор противника! Похоже, это ${randomOpponent}. Готовлю арену для битвы...`);
      }
      
      // Генерируем случайные суперспособности для битвы
      const randomPowers = generateRandomSuperPowers();
      setSuperPowers(randomPowers);
    }, 1500);
  };
  
  const generateRandomSuperPowers = () => {
    // Выбираем 3-5 случайных суперспособностей
    const powerCount = Math.floor(Math.random() * 3) + 3; // 3-5 способностей
    const selectedPowers: string[] = [];
    
    const shuffledPowers = [...allSuperPowers].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < powerCount; i++) {
      selectedPowers.push(shuffledPowers[i]);
    }
    
    return selectedPowers;
  };
  
  const generateBattle = () => {
    // Выбираем случайную локацию
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    setBattleLocation(randomLocation);
    setIsBattleStarted(true);
    
    if (isCapybara) {
      setMessage(`Битва между капибарами начинается на арене "${randomLocation}"! Это будет дружеский поединок!`);
    } else {
      setMessage(`Битва начинается на арене "${randomLocation}"! Против тебя ${opponentType}. Используй свои суперспособности!`);
    }
    
    // Сбрасываем прогресс битвы
    setBattleProgress(0);
    setIsBattleWon(false);
  };
  
  const useSuperPower = (power: string) => {
    // Увеличиваем прогресс битвы
    const newProgress = battleProgress + Math.floor(Math.random() * 20) + 10; // 10-30%
    
    if (newProgress >= 100) {
      // Битва выиграна
      setMessage(`Мощная атака "${power}" принесла победу! Противник повержен!`);
      setBattleProgress(100);
      setIsBattleWon(true);
    } else {
      // Битва продолжается
      setMessage(`Ты применил "${power}"! Битва продолжается!`);
      setBattleProgress(newProgress);
    }
  };
  
  const resetBattle = () => {
    setUserImage(null);
    setBattleLocation("");
    setIsBattleStarted(false);
    setMessage("Я жду нового вызова! Загрузи изображение противника!");
    setOpponentType(null);
    setIsCapybara(false);
    setSuperPowers([]);
    setBattleProgress(0);
    setIsBattleWon(false);
  };
  
  // Рендерим сиреневые сферы вокруг капибары
  const renderMagicSpheres = () => {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-purple-400/60 animate-pulse-slow"
            style={
              {
                width: `${20 + Math.random() * 15}px`,
                height: `${20 + Math.random() * 15}px`,
                top: `${25 + Math.sin(i) * 60}%`,
                left: `${25 + Math.cos(i) * 60}%`,
                animationDelay: `${i * 0.2}s`,
                boxShadow: '0 0 15px 5px rgba(168, 85, 247, 0.5)',
                filter: 'blur(2px)'
              }
            }
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 to-purple-500 p-4 flex flex-col items-center justify-center">
      {!isBattleStarted ? (
        <Card className="w-full max-w-md bg-white/90 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-6 text-center">
                <div className="relative">
                  <img 
                    src="https://cdn.poehali.dev/files/276f587d-993c-4665-ba39-2bb9de5fce9a.png" 
                    alt="Капибара-маг" 
                    className="h-40 mx-auto mb-2" 
                  />
                  {renderMagicSpheres()}
                </div>
                <div 
                  className={`mt-4 p-3 bg-purple-100 rounded-lg border border-purple-300 transition-opacity duration-500 ${messageVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p className="text-purple-800 font-medium">{message}</p>
                </div>
                <h1 className="text-2xl font-bold text-purple-800 mt-4">Капибара-маг ждёт твой вызов!</h1>
              </div>
              
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload} 
                ref={fileInputRef}
              />
              
              <Button 
                onClick={() => fileInputRef.current?.click()} 
                className="w-full bg-purple-600 hover:bg-purple-700 mb-4"
              >
                <Icon name="Upload" className="mr-2" />
                Загрузить изображение
              </Button>
              
              {userImage && (
                <div className="mt-4 w-full">
                  {opponentType && (
                    <Badge variant="outline" className="mb-2 bg-purple-100 text-purple-800 mx-auto">
                      {isCapybara ? "Противник: Дружественная капибара" : `Противник: ${opponentType}`}
                    </Badge>
                  )}
                  <div className="relative aspect-square w-full max-w-[200px] mx-auto overflow-hidden rounded-md border border-purple-200 mb-4">
                    <img 
                      src={userImage} 
                      alt="Загруженное изображение" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Button 
                    onClick={generateBattle} 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Icon name="Wand" className="mr-2" />
                    Начать магическую битву
                  </Button>
                </div>
              )}
              
              <Button
                variant="ghost"
                onClick={() => setIsDialogOpen(true)}
                className="mt-4 text-purple-600"
              >
                Как играть?
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-4xl bg-white/90 shadow-xl battle-card">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div 
                className={`mb-6 p-3 bg-purple-100 rounded-lg border border-purple-300 w-full transition-opacity duration-500 ${messageVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                <p className="text-purple-800 font-medium text-center">{message}</p>
              </div>
              
              <h1 className="text-2xl font-bold text-purple-800 mb-4 magic-text">
                {isCapybara ? "Дружеская магическая дуэль" : "Магическая битва началась!"}
              </h1>
              <p className="text-lg text-center text-purple-600 mb-2">Место сражения: {battleLocation}</p>
              
              {/* Прогресс битвы */}
              <div className="w-full mb-4 bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-purple-600 h-4 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${battleProgress}%` }}
                ></div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 w-full mb-6">
                <div className="flex-1 flex justify-center">
                  <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-md border-4 border-purple-300">
                    <img 
                      src="https://cdn.poehali.dev/files/276f587d-993c-4665-ba39-2bb9de5fce9a.png" 
                      alt="Капибара-маг" 
                      className="h-full w-full object-cover"
                    />
                    {renderMagicSpheres()}
                    <div className="absolute bottom-0 left-0 right-0 bg-purple-600/80 text-white p-2 text-center">
                      Капибара-маг
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="text-4xl font-bold text-purple-800">VS</div>
                </div>
                
                <div className="flex-1 flex justify-center">
                  <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-md border-4 border-red-300">
                    <img 
                      src={userImage || ""} 
                      alt="Противник" 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-red-600/80 text-white p-2 text-center">
                      {isCapybara ? "Дружественная капибара" : `Таинственный ${opponentType}`}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Кнопки суперспособностей */}
              {!isBattleWon ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full mb-6">
                  {superPowers.map((power, index) => (
                    <Button 
                      key={index} 
                      onClick={() => useSuperPower(power)}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      variant={isCapybara ? "
outline" : "default"}
                    >
                      <Icon name={
                        power.includes("Огненный") ? "Flame" :
                        power.includes("Ледяной") ? "Snowflake" :
                        power.includes("Молния") ? "Zap" :
                        power.includes("Водн") ? "Droplets" :
                        power.includes("Лиан") ? "Sprout" :
                        "Sparkles"
                      } className="mr-2" />
                      {power}
                    </Button>
                  )})
                </div>
              ) : (
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-purple-600 mb-3">Победа!</h2>
                  <p className="text-lg">Противник повержен магической силой капибары!</p>
                </div>
              )}
              
              <div className="w-full mb-6">
                <h2 className="text-xl font-medium text-purple-800 mb-2">Опишите ход своей битвы:</h2>
                <Textarea 
                  placeholder={isCapybara ? 
                    "Капибара-маг и дружественная капибара устроили соревнование по магическим трюкам..." : 
                    "Капибара-маг взмахнула волшебной палочкой и призвала мощный вихрь..."
                  } 
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex gap-4">
                <Button 
                  onClick={resetBattle} 
                  variant="outline"
                  className="border-purple-600 text-purple-600"
                >
                  <Icon name="RotateCcw" className="mr-2" />
                  Новая битва
                </Button>
                {!isBattleWon && (
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => useSuperPower("Секретная магия")}
                  >
                    <Icon name="Sparkles" className="mr-2" />
                    Применить секретную магию
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-purple-800">Как играть в Магические Битвы</DialogTitle>
            <DialogDescription>
              Добро пожаловать в мир Капибары-мага!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                <span className="text-purple-800 font-bold">1</span>
              </div>
              <p>Загрузите изображение вашего противника. Это может быть что угодно: другое животное, предмет или даже пейзаж.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                <span className="text-purple-800 font-bold">2</span>
              </div>
              <p>Капибара-маг определит тип противника и даст вам случайные суперспособности для битвы.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                <span className="text-purple-800 font-bold">3</span>
              </div>
              <p>Используйте суперспособности, чтобы победить противника! Каждое применение способности приближает вас к победе.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                <span className="text-purple-800 font-bold">4</span>
              </div>
              <p>Если противник - другая капибара, битва превратится в дружеское соревнование!</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                <span className="text-purple-800 font-bold">5</span>
              </div>
              <p>Вы можете начать новую битву в любой момент, загрузив другое изображение.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
