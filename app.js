window.onload = function() {
            var canvas = document.getElementById("canv");
            var ctx = canvas.getContext("2d");

            function randomColor() {
                return '#' + Math.random().toString(16).slice(2, 8);
            }

            function randomWord() {
                var word = words[Math.floor(Math.random() * words.length)];
                return word;
            }

            function randomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            // Адаптируем canvas под полный размер окна
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            var particles = [];
            var mouse = {};
            var particle_count = 100;

            for (var i = 0; i < particle_count; i++) {
                particles.push(new Particle());
            }

            canvas.addEventListener('mousedown', trackMouse, false);
            canvas.addEventListener('touchstart', trackMouse, false);

            function trackMouse(e) {
                mouse.x = e.pageX || e.touches[0].pageX;
                mouse.y = e.pageY || e.touches[0].pageY;
                for (var i = 0; i < particle_count; i++) {
                    particles.push(new Particle());
                }
            }

            function Particle() {
                this.speed = {
                    x: -2.5 + Math.random() * 5,
                    y: -2.5 + Math.random() * 5
                };

                if (mouse.x && mouse.y) {
                    this.location = {
                        x: mouse.x,
                        y: mouse.y
                    };
                } else {
                    this.location = {
                        x: canvas.width / 2,
                        y: canvas.height / 2
                    };
                }

                this.color = randomColor();
                this.font = {
                    size: randomInt(10, 30) // Размер текста в px
                };
                this.word = randomWord();
            }

            function draw() {
                ctx.globalCompositeOperation = "source-over";
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = "lighter";

                for (var i = 0; i < particles.length; i++) {
                    var p = particles[i];
                    ctx.beginPath();
                    ctx.font = p.font.size + "px Luckiest Guy";
                    ctx.textAlign = "center";
                    ctx.fillStyle = p.color;
                    ctx.fillText(p.word, p.location.x, p.location.y);
                    ctx.fill();

                    p.location.x += p.speed.x;
                    p.location.y += p.speed.y;

                    p.speed.x += randomInt(-1, 1) * 0.01;
                    p.speed.y += randomInt(-1, 1) * 0.01;
                }
            }
            setInterval(draw, 30);
        };

        // Массив слов
        var words = ["Алла", "Аллочка", "Аркадий", "Единорожка", "Я вас люблю", "Вы мои родные", "И любимые"];