import { useState, useRef, useEffect } from "react";import { Button } from "@/components/ui/button";import { Card, CardContent } from "@/components/ui/card";import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";import { Textarea } from "@/components/ui/textarea";import Icon from "@/components/ui/icon";

const Index = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [battleLocation, setBattleLocation] = useState("");
  const [isBattleStarted, setIsBattleStarted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("Я тебя жду, загрузи изображение противника!");
  const [messageVisible, setMessageVisible] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const locations = [
    "Огненные пустоши", 
    "Подводные пещеры", 
    "Заброшенный замок", 
    "Зачарованный лес",
    "Облачный город",
    "Кристальные горы"
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
        setMessage("Отличный выбор противника! Готовлю арену для битвы...");
      };
      reader.readAsDataURL(file);
    }
  };

  const generateBattle = () => {
    // Выбираем случайную локацию
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    setBattleLocation(randomLocation);
    setIsBattleStarted(true);
    setMessage(`Битва начинается на арене "${randomLocation}"! Покажи на что способен!`);
  };

  const resetBattle = () => {
    setUserImage(null);
    setBattleLocation("");
    setIsBattleStarted(false);
    setMessage("Я жду нового вызова! Загрузи изображение противника!");
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
                  <p className="text-center text-sm text-gray-500 mb-2">Изображение загружено!</p>
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
              
              <h1 className="text-2xl font-bold text-purple-800 mb-4 magic-text">Магическая битва началась!</h1>
              <p className="text-lg text-center text-purple-600 mb-6">Место сражения: {battleLocation}</p>
              
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
                      Таинственный противник
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full mb-6">
                <h2 className="text-xl font-medium text-purple-800 mb-2">Опишите ход своей битвы:</h2>
                <Textarea 
                  placeholder="Капибара-маг взмахнула волшебной палочкой и призвала мощный вихрь..." 
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
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Icon name="Sparkles" className="mr-2" />
                  Применить магию
                </Button>
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
              <p>Капибара-маг создаст магическую битву и выберет случайную локацию для сражения.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                <span className="text-purple-800 font-bold">3</span>
              </div>
              <p>Опишите, как проходит ваша битва! Используйте воображение и придумывайте магические заклинания.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                <span className="text-purple-800 font-bold">4</span>
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