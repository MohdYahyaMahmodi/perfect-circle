/**
 * Draw a Perfect Circle Game
 * Created by: Mohd Mahmodi
 * GitHub: https://github.com/MohdYahyaMahmodi/perfect-circle
 *
 * This game challenges users to draw a perfect circle and provides
 * humorous feedback based on their performance. It supports multiple
 * languages and tracks high scores.
 */

// Get necessary HTML elements to manipulate them later
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const messageElement = document.getElementById('message');
const instructionElement = document.getElementById('instruction');
const percentageElement = document.getElementById('percentage');
const feedbackElement = document.getElementById('feedback');
const scoreBoardElement = document.getElementById('scoreBoard');
const languageSelect = document.getElementById('languageSelect');
const highScoreDisplayElement = document.getElementById('highScoreDisplay');

let isDrawing = false; // Flag to check if user is currently drawing
let points = []; // Stores points of the drawing
let highScore = 0; // Keeps track of the user's high score
let gameState = 'instruction'; // Game states: 'instruction', 'playing', 'result'
let currentLanguage = 'en'; // Default language setting

// Object containing translation texts for different languages
const translations = {
en: {
instruction: "Click or touch and drag to draw a circle.<br>Try to make it as perfect as possible!<br>Release to end.",
playAgain: "Click anywhere to play again",
perfection: "Perfection",
highScore: "High Score",
keepDrawing: "Keep drawing...",
sourceCode: "Source Code",
locale: 'en-US',
feedback: {
    terrible: [
        "Bruh, that's not a circle, that's a cry for help.",
        "Did you draw this with your feet while blindfolded?",
        "This circle is so bad, it's breaking the laws of geometry.",
        "I've seen better circles in a bowl of SpaghettiOs.",
        "Your circle game is weaker than McDonald's WiFi.",
        "This circle is more disappointing than game of thrones season 8.",
        "That's not a circle, that's a visual representation of my Monday mornings.",
        "Your circle is so bad, it made Flat Earthers question their beliefs.",
        "This circle is about as round as a Minecraft block.",
        "Congrats, you've invented a new shape. Scientists are baffled."
    ],
    poor: [
        "This circle is so mid, it's basically a participation trophy.",
        "Your circle game is more off than my sleep schedule.",
        "This shape is having an identity crisis between a circle and a potato.",
        "Did you learn geometry from a TikTok tutorial?",
        "This circle is as smooth as my pickup lines... not very.",
        "Your circle is more elliptical than Elon Musk's Twitter takeover.",
        "This circle has more edges than a teenager's Tumblr account.",
        "Your circle is about as round as a flat earther's argument.",
        "This shape is so bad, it's being denied entry into the circle of trust.",
        "Your circle game is weaker than a Starbucks WiFi connection."
    ],
    average: [
        "This circle is more mid than a millennial's quarter-life crisis.",
        "Your circle is as average as a pumpkin spice latte in October.",
        "This circle is so mediocre, it could be an NPC in a video game.",
        "Your circle game is as lukewarm as day-old coffee.",
        "This shape is screaming 'I put in minimal effort'.",
        "Your circle is about as exciting as watching paint dry.",
        "This circle is the geometric equivalent of saying 'meh'.",
        "Your circle game is as basic as an Instagram influencer's feed.",
        "This shape is more indecisive than me choosing a Netflix show.",
        "Your circle is the participation trophy of geometry."
    ],
    good: [
        "Okay, this circle doesn't totally suck. You're leveling up!",
        "Your circle game is stronger than my coffee this morning.",
        "This shape is smoother than a pick-up artist at a bar.",
        "Your circle is more on point than my eyeliner on a good day.",
        "This circle is fresher than the Prince of Bel-Air.",
        "Your geometry skills are more fire than my mixtape.",
        "This circle is more satisfying than popping bubble wrap.",
        "Your circle game is stronger than the plot armor in Game of Thrones.",
        "This shape is cleaner than my browser history.",
        "Your circle is more precise than a YouTube apology video."
    ],
    excellent: [
        "This circle is so perfect, it's making other shapes jealous.",
        "Your circle game is stronger than Thor's biceps.",
        "This shape is smoother than a jazz saxophone solo.",
        "Your circle is more flawless than my excuses for being late.",
        "This circle is more perfect than my imaginary girlfriend.",
        "Your geometry skills are sharper than a samurai sword.",
        "This circle is rounder than the earth (sorry, flat earthers).",
        "Your circle game is stronger than my Wi-Fi password.",
        "This shape is more precise than a Swiss watch.",
        "Your circle is more perfect than my Instagram filter game."
    ],
    perfect: [
        "This circle is so perfect, it broke the simulation we're living in.",
        "Your circle game is god-tier. Are you even human?",
        "This shape is so flawless, it's making mathematicians question reality.",
        "Your circle is more perfect than my nonexistent love life.",
        "This circle is so round, it's bending space-time.",
        "Your geometry skills are more lit than a supernova.",
        "This circle is smoother than my pick-up lines in my dreams.",
        "Your circle game just won the geometric equivalent of the Olympics.",
        "This shape is so perfect, it's causing an existential crisis in other circles.",
        "Your circle is more flawless than my plan to take over the world."
    ]
}
},
es: {
instruction: "Haz clic o toca y arrastra para dibujar un círculo.<br>¡Intenta hacerlo lo más perfecto posible!<br>Suelta para terminar.",
playAgain: "Haz clic en cualquier lugar para jugar de nuevo",
perfection: "Perfección",
highScore: "Puntuación más alta",
keepDrawing: "Sigue dibujando...",
sourceCode: "Código fuente",
locale: 'es-ES',
feedback: {
    terrible: [
        "Tío, eso no es un círculo, es un grito de ayuda.",
        "¿Lo dibujaste con los pies mientras llevabas una venda en los ojos?",
        "Este círculo es tan malo que está rompiendo las leyes de la geometría.",
        "He visto círculos mejores en un plato de garbanzos.",
        "Tu juego de círculos es más débil que el WiFi de un bar cutre.",
        "Este círculo es más decepcionante que el final de Juego de Tronos.",
        "Eso no es un círculo, es una representación visual de mis lunes por la mañana.",
        "Tu círculo es tan malo que hizo que los terraplanistas cuestionaran sus creencias.",
        "Este círculo es tan redondo como un bloque de Minecraft.",
        "Enhorabuena, has inventado una nueva forma. Los científicos están perplejos."
    ],
    poor: [
        "Este círculo es tan mediocre que prácticamente es un trofeo de participación.",
        "Tu juego de círculos está más desajustado que mi horario de sueño.",
        "Esta forma está teniendo una crisis de identidad entre un círculo y una patata.",
        "¿Aprendiste geometría de un tutorial de TikTok?",
        "Este círculo es tan suave como mis frases de ligue... o sea, nada.",
        "Tu círculo es más elíptico que la compra de Twitter por Elon Musk.",
        "Este círculo tiene más bordes que el perfil de Tumblr de un adolescente.",
        "Tu círculo es tan redondo como el argumento de un terraplanista.",
        "Esta forma es tan mala que le están negando la entrada al círculo de confianza.",
        "Tu juego de círculos es más débil que la conexión WiFi de un Starbucks."
    ],
    average: [
        "Este círculo es más mediocre que la crisis de los 30 de un millennial.",
        "Tu círculo es tan promedio como un 'café con leche' en octubre.",
        "Este círculo es tan mediocre que podría ser un NPC en un videojuego.",
        "Tu juego de círculos está tan tibio como un café de ayer.",
        "Esta forma está gritando 'He puesto el mínimo esfuerzo'.",
        "Tu círculo es tan emocionante como ver secarse la pintura.",
        "Este círculo es el equivalente geométrico de decir 'meh'.",
        "Tu juego de círculos es tan básico como el feed de un influencer de Instagram.",
        "Esta forma es más indecisa que yo eligiendo una serie en Netflix.",
        "Tu círculo es el trofeo de participación de la geometría."
    ],
    good: [
        "Vale, este círculo no apesta del todo. ¡Estás subiendo de nivel!",
        "Tu juego de círculos es más fuerte que mi café esta mañana.",
        "Esta forma es más suave que un ligón en un bar.",
        "Tu círculo es más preciso que mi delineado en un buen día.",
        "Este círculo es más fresco que el Príncipe de Bel-Air.",
        "Tus habilidades geométricas son más fuego que mi mixtape.",
        "Este círculo es más satisfactorio que explotar plástico de burbujas.",
        "Tu juego de círculos es más fuerte que la armadura argumental en Juego de Tronos.",
        "Esta forma está más limpia que mi historial de navegación.",
        "Tu círculo es más preciso que un vídeo de disculpas de YouTube."
    ],
    excellent: [
        "Este círculo es tan perfecto que está poniendo celosas a otras formas.",
        "Tu juego de círculos es más fuerte que los bíceps de Thor.",
        "Esta forma es más suave que un solo de saxofón de jazz.",
        "Tu círculo es más impecable que mis excusas por llegar tarde.",
        "Este círculo es más perfecto que mi novio imaginario.",
        "Tus habilidades geométricas son más afiladas que una katana.",
        "Este círculo es más redondo que la Tierra (lo siento, terraplanistas).",
        "Tu juego de círculos es más fuerte que mi contraseña de Wi-Fi.",
        "Esta forma es más precisa que un reloj suizo.",
        "Tu círculo es más perfecto que mi juego de filtros de Instagram."
    ],
    perfect: [
        "Este círculo es tan perfecto que rompió la simulación en la que vivimos.",
        "Tu juego de círculos es de nivel divino. ¿Eres siquiera humano?",
        "Esta forma es tan impecable que está haciendo que los matemáticos cuestionen la realidad.",
        "Tu círculo es más perfecto que mi inexistente vida amorosa.",
        "Este círculo es tan redondo que está doblando el espacio-tiempo.",
        "Tus habilidades geométricas son más lit que una supernova.",
        "Este círculo es más suave que mis frases de ligue en mis sueños.",
        "Tu juego de círculos acaba de ganar el equivalente geométrico de las Olimpiadas.",
        "Esta forma es tan perfecta que está causando una crisis existencial en otros círculos.",
        "Tu círculo es más impecable que mi plan para dominar el mundo."
    ]
}
},
fr: {
instruction: "Cliquez ou touchez et faites glisser pour dessiner un cercle.<br>Essayez de le rendre aussi parfait que possible !<br>Relâchez pour terminer.",
playAgain: "Cliquez n'importe où pour rejouer",
perfection: "Perfection",
highScore: "Meilleur score",
keepDrawing: "Continuez à dessiner...",
sourceCode: "Code source",
locale: 'fr-FR',
feedback: {
    terrible: [
        "Mec, ce n'est pas un cercle, c'est un appel à l'aide.",
        "Tu l'as dessiné avec tes pieds les yeux bandés ?",
        "Ce cercle est si mauvais qu'il brise les lois de la géométrie.",
        "J'ai vu de meilleurs cercles dans une assiette de spaghettis.",
        "Ton jeu de cercle est plus faible que le WiFi du McDo.",
        "Ce cercle est plus décevant que la saison 8 de Game of Thrones.",
        "Ce n'est pas un cercle, c'est une représentation visuelle de mes lundis matins.",
        "Ton cercle est si mauvais qu'il a fait douter les platistes.",
        "Ce cercle est aussi rond qu'un bloc Minecraft.",
        "Félicitations, tu as inventé une nouvelle forme. Les scientifiques sont perplexes."
    ],
    poor: [
        "Ce cercle est tellement médiocre, c'est pratiquement un trophée de participation.",
        "Ton jeu de cercle est plus décalé que mon rythme de sommeil.",
        "Cette forme a une crise d'identité entre un cercle et une patate.",
        "Tu as appris la géométrie sur un tutoriel TikTok ?",
        "Ce cercle est aussi lisse que mes techniques de drague... pas terrible.",
        "Ton cercle est plus elliptique que le rachat de Twitter par Elon Musk.",
        "Ce cercle a plus de bords que le compte Tumblr d'un ado.",
        "Ton cercle est aussi rond que l'argument d'un platiste.",
        "Cette forme est si mauvaise qu'on lui refuse l'entrée dans le cercle de confiance.",
        "Ton jeu de cercle est plus faible que la connexion WiFi d'un Starbucks."
    ],
    average: [
        "Ce cercle est plus moyen que la crise de la trentaine d'un millennial.",
        "Ton cercle est aussi banal qu'un latte à la citrouille en octobre.",
        "Ce cercle est tellement médiocre qu'il pourrait être un PNJ dans un jeu vidéo.",
        "Ton jeu de cercle est aussi tiède qu'un café d'hier.",
        "Cette forme crie 'J'ai mis le minimum d'effort'.",
        "Ton cercle est aussi excitant que regarder la peinture sécher.",
        "Ce cercle est l'équivalent géométrique de dire 'bof'.",
        "Ton jeu de cercle est aussi basique que le feed d'un influenceur Instagram.",
        "Cette forme est plus indécise que moi choisissant une série sur Netflix.",
        "Ton cercle est le trophée de participation de la géométrie."
    ],
    good: [
        "Ok, ce cercle n'est pas totalement nul. Tu montes en niveau !",
        "Ton jeu de cercle est plus fort que mon café ce matin.",
        "Cette forme est plus lisse qu'un dragueur dans un bar.",
        "Ton cercle est plus précis que mon eye-liner un bon jour.",
        "Ce cercle est plus frais que le Prince de Bel-Air.",
        "Tes compétences en géométrie sont plus chaudes que ma mixtape.",
        "Ce cercle est plus satisfaisant que faire éclater du papier bulle.",
        "Ton jeu de cercle est plus solide que l'armure scénaristique dans Game of Thrones.",
        "Cette forme est plus propre que mon historique de navigation.",
        "Ton cercle est plus précis qu'une vidéo d'excuses YouTube."
    ],
    excellent: [
        "Ce cercle est tellement parfait qu'il rend les autres formes jalouses.",
        "Ton jeu de cercle est plus fort que les biceps de Thor.",
        "Cette forme est plus lisse qu'un solo de saxophone jazz.",
        "Ton cercle est plus impeccable que mes excuses pour être en retard.",
        "Ce cercle est plus parfait que mon petit ami imaginaire.",
        "Tes compétences en géométrie sont plus affûtées qu'un katana.",
        "Ce cercle est plus rond que la Terre (désolé, les platistes).",
        "Ton jeu de cercle est plus fort que mon mot de passe Wi-Fi.",
        "Cette forme est plus précise qu'une montre suisse.",
        "Ton cercle est plus parfait que mon jeu de filtres Instagram."
    ],
    perfect: [
        "Ce cercle est si parfait qu'il a brisé la simulation dans laquelle nous vivons.",
        "Ton jeu de cercle est de niveau divin. Es-tu même humain ?",
        "Cette forme est si impeccable qu'elle fait douter les mathématiciens de la réalité.",
        "Ton cercle est plus parfait que ma vie amoureuse inexistante.",
        "Ce cercle est si rond qu'il courbe l'espace-temps.",
        "Tes compétences en géométrie sont plus allumées qu'une supernova.",
        "Ce cercle est plus lisse que mes techniques de drague dans mes rêves.",
        "Ton jeu de cercle vient de gagner l'équivalent géométrique des Jeux Olympiques.",
        "Cette forme est si parfaite qu'elle provoque une crise existentielle chez les autres cercles.",
        "Ton cercle est plus impeccable que mon plan pour dominer le monde."
    ]
}
},
de: {
instruction: "Klicken oder berühren und ziehen Sie, um einen Kreis zu zeichnen.<br>Versuchen Sie, ihn so perfekt wie möglich zu machen!<br>Loslassen zum Beenden.",
playAgain: "Klicken Sie irgendwo, um erneut zu spielen",
perfection: "Perfektion",
highScore: "Höchstpunktzahl",
keepDrawing: "Weiter zeichnen...",
sourceCode: "Quellcode",
locale: 'de-DE',
feedback: {
    terrible: [
        "Alter, das ist kein Kreis, das ist ein Hilferuf.",
        "Hast du das mit den Füßen und verbundenen Augen gezeichnet?",
        "Dieser Kreis ist so schlecht, er bricht die Gesetze der Geometrie.",
        "Ich habe bessere Kreise in einer Schüssel Spaghetti-Os gesehen.",
        "Dein Kreisspiel ist schwächer als das WLAN bei McDonald's.",
        "Dieser Kreis ist enttäuschender als Staffel 8 von Game of Thrones.",
        "Das ist kein Kreis, das ist eine visuelle Darstellung meiner Montagmorgende.",
        "Dein Kreis ist so schlecht, dass er Flacherdler an ihren Überzeugungen zweifeln lässt.",
        "Dieser Kreis ist so rund wie ein Minecraft-Block.",
        "Glückwunsch, du hast eine neue Form erfunden. Wissenschaftler sind ratlos."
    ],
    poor: [
        "Dieser Kreis ist so mittelmäßig, er ist praktisch eine Teilnahmeurkunde.",
        "Dein Kreisspiel ist chaotischer als mein Schlafrhythmus.",
        "Diese Form hat eine Identitätskrise zwischen Kreis und Kartoffel.",
        "Hast du Geometrie aus einem TikTok-Tutorial gelernt?",
        "Dieser Kreis ist so glatt wie meine Anmachsprüche... also gar nicht.",
        "Dein Kreis ist elliptischer als Elon Musks Twitter-Übernahme.",
        "Dieser Kreis hat mehr Kanten als das Tumblr-Konto eines Teenagers.",
        "Dein Kreis ist so rund wie das Argument eines Flacherdlers.",
        "Diese Form ist so schlecht, dass ihr der Eintritt in den Kreis des Vertrauens verweigert wird.",
        "Dein Kreisspiel ist schwächer als die WLAN-Verbindung bei Starbucks."
    ],
    average: [
        "Dieser Kreis ist mittelmäßiger als die Quarter-Life-Crisis eines Millennials.",
        "Dein Kreis ist so durchschnittlich wie ein Kürbis-Latte im Oktober.",
        "Dieser Kreis ist so mittelmäßig, er könnte ein NPC in einem Videospiel sein.",
        "Dein Kreisspiel ist so lauwarm wie Kaffee von gestern.",
        "Diese Form schreit 'Ich habe minimalen Aufwand betrieben'.",
        "Dein Kreis ist so spannend wie beim Trocknen der Farbe zuzusehen.",
        "Dieser Kreis ist das geometrische Äquivalent von 'meh'.",
        "Dein Kreisspiel ist so basic wie der Feed eines Instagram-Influencers.",
        "Diese Form ist unentschlossener als ich beim Auswählen einer Netflix-Serie.",
        "Dein Kreis ist die Teilnahmeurkunde der Geometrie."
    ],
    good: [
        "Okay, dieser Kreis ist nicht völlig schlecht. Du levelst auf!",
        "Dein Kreisspiel ist stärker als mein Kaffee heute Morgen.",
        "Diese Form ist glatter als ein Aufreißer in einer Bar.",
        "Dein Kreis ist präziser als mein Eyeliner an einem guten Tag.",
        "Dieser Kreis ist frischer als der Prinz von Bel-Air.",
        "Deine Geometrie-Skills sind heißer als mein Mixtape.",
        "Dieser Kreis ist befriedigender als Luftpolsterfolie zu zerplatzen.",
        "Dein Kreisspiel ist stärker als die Handlungsrüstung in Game of Thrones.",
        "Diese Form ist sauberer als mein Browserverlauf.",
        "Dein Kreis ist präziser als ein YouTube-Entschuldigungsvideo."
    ],
    excellent: [
        "Dieser Kreis ist so perfekt, dass er andere Formen eifersüchtig macht.",
        "Dein Kreisspiel ist stärker als Thors Bizeps.",
        "Diese Form ist glatter als ein Jazz-Saxophon-Solo.",
        "Dein Kreis ist makelloser als meine Ausreden fürs Zuspätkommen.",
        "Dieser Kreis ist perfekter als mein imaginärer Freund.",
        "Deine Geometrie-Fähigkeiten sind schärfer als ein Samuraischwert.",
        "Dieser Kreis ist runder als die Erde (tut mir leid, Flacherdler).",
        "Dein Kreisspiel ist stärker als mein WLAN-Passwort.",
        "Diese Form ist präziser als eine Schweizer Uhr.",
        "Dein Kreis ist perfekter als mein Instagram-Filter-Spiel."
    ],
    perfect: [
        "Dieser Kreis ist so perfekt, dass er die Simulation, in der wir leben, zerstört hat.",
        "Dein Kreisspiel ist gottgleich. Bist du überhaupt menschlich?",
        "Diese Form ist so makellos, dass sie Mathematiker an der Realität zweifeln lässt.",
        "Dein Kreis ist perfekter als mein nicht vorhandenes Liebesleben.",
        "Dieser Kreis ist so rund, dass er die Raumzeit krümmt.",
        "Deine Geometrie-Fähigkeiten sind erleuchteter als eine Supernova.",
        "Dieser Kreis ist glatter als meine Anmachsprüche in meinen Träumen.",
        "Dein Kreisspiel hat gerade das geometrische Äquivalent der Olympischen Spiele gewonnen.",
        "Diese Form ist so perfekt, dass sie eine Existenzkrise bei anderen Kreisen auslöst.",
        "Dein Kreis ist makelloser als mein Plan zur Weltherrschaft."
    ]
}
},
ja: {
instruction: "クリックまたはタッチしてドラッグし、円を描きます。<br>できるだけ完璧に描いてみてください！<br>離すと終了します。",
playAgain: "どこかをクリックしてもう一度プレイ",
perfection: "完成度",
highScore: "ハイスコア",
keepDrawing: "描き続けてください...",
sourceCode: "ソースコード",
locale: 'ja-JP',
feedback: {
    terrible: [
        "ブラザー、それ円じゃなくて助けを求める叫びだよ。",
        "目隠しして足で描いたの？",
        "この円、幾何学の法則を破壊しちゃってるよ。",
        "スパゲッティ・オーズの中の方がまだマシな円見たことあるわ。",
        "君の円ゲーム、マクドナルドのWi-Fiより弱いね。",
        "この円、ゲーム・オブ・スローンズのシーズン8より残念。",
        "それ円じゃなくて、私の月曜朝の視覚化だよ。",
        "君の円、地球平面説者の信念を揺るがすレベルで酷いね。",
        "この円、マインクラフトのブロックくらい丸いよ。",
        "おめでとう、新しい形を発明したね。科学者たちが困惑してるよ。"
    ],
    poor: [
        "この円、参加賞レベルの「まあまあ」だね。",
        "君の円ゲーム、私の睡眠スケジュールよりズレてるよ。",
        "この形、円とジャガイモのアイデンティティ危機起こしてるね。",
        "TikTokチュートリアルで幾何学習ったの？",
        "この円、私の口説き文句くらいスムーズ...つまり全然ね。",
        "君の円、イーロン・マスクのTwitter買収より楕円的だよ。",
        "この円、ティーンのTumblrアカウントより角が多いね。",
        "君の円、地球平面説者の主張くらい丸いよ。",
        "この形、信頼の輪への入場を拒否されるレベルで酷いね。",
        "君の円ゲーム、スターバックスのWi-Fi接続より弱いよ。"
    ],
    average: [
        "この円、ミレニアル世代の人生の四半期危機くらい「まあまあ」だね。",
        "君の円、10月のパンプキンスパイスラテくらい平均的。",
        "この円、ビデオゲームのNPCになれるくらい平凡だよ。",
        "君の円ゲーム、昨日のコーヒーくらいぬるいね。",
        "この形、「最小限の努力しか入れてない」って叫んでるよ。",
        "君の円、ペンキの乾くのを見てるくらい面白いね。",
        "この円、「まあね」の幾何学的等価物だよ。",
        "君の円ゲーム、インスタグラマーのフィードくらいベーシック。",
        "この形、Netflixで何見るか決められない私くらい優柔不断。",
        "君の円、幾何学の参加賞だね。"
    ],
    good: [
        "オーケー、この円、完全に酷くはないね。レベルアップしてる！",
        "君の円ゲーム、今朝の私のコーヒーより強いよ。",
        "この形、バーのナンパ師よりスムーズだね。",
        "君の円、いい日の私のアイライナーより正確だよ。",
        "この円、ベル・エアのフレッシュ・プリンスより新鮮！",
        "君の幾何学スキル、私のミックステープより火傷しそう。",
        "この円、プチプチ潰すより満足感あるね。",
        "君の円ゲーム、ゲーム・オブ・スローンズのプロット・アーマーより強いよ。",
        "この形、私のブラウザ履歴より綺麗だね。",
        "君の円、YouTubeの謝罪動画より正確だよ。"
    ],
    excellent: [
        "この円、他の形を嫉妬させるくらい完璧だよ。",
        "君の円ゲーム、ソーの上腕二頭筋より強いね。",
        "この形、ジャズのサックスソロよりスムーズだよ。",
        "君の円、遅刻の言い訳より完璧だね。",
        "この円、私の想像上の彼氏より完璧。",
        "君の幾何学スキル、侍の刀より鋭いよ。",
        "この円、地球より丸いね（ごめんね、地球平面説者）。",
        "君の円ゲーム、私のWi-Fiパスワードより強固だよ。",
        "この形、スイスの時計より精密だね。",
        "君の円、私のインスタグラムフィルター技術より完璧。"
    ],
    perfect: [
        "この円、私たちが生きてるシミュレーションを壊すくらい完璧だよ。",
        "君の円ゲーム、神レベル。人間なの？",
        "この形、数学者に現実を疑わせるくらい完璧だね。",
        "君の円、私の存在しない恋愛生活より完璧だよ。",
        "この円、丸すぎて時空を歪めてるね。",
        "君の幾何学スキル、超新星より輝いてるよ。",
        "この円、夢の中の私の口説き文句よりスムーズだね。",
        "君の円ゲーム、幾何学のオリンピックで金メダル取れるよ。",
        "この形、他の円に実存的危機を引き起こすくらい完璧だね。",
        "君の円、世界征服計画より完璧だよ。"
    ]
}
}
};

// Resizes canvas to fit the window's dimensions
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Ensures canvas always fits screen when the window is resized
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initializes the game after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeGame);

// Add event listeners to handle mouse and touch inputs
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', endDrawing);
languageSelect.addEventListener('change', changeLanguage);

// Initializes the game by loading high score, setting up language, and displaying instructions if needed
function initializeGame() {
  loadHighScore();
  changeLanguage();
  updateSourceCodeText();
  // Show instructions if it's the first time the user is visiting
  if (!getCookie('instructionsShown')) {
      showInstructions();
      setCookie('instructionsShown', 'true', 365);
  } else {
      resetGame();
  }
}

// Handle mouse down event to start drawing and reset game if needed
function handleMouseDown(e) {
  if (gameState !== 'playing') {
      resetGame();
  }
  startDrawing(e);
}

// Handle touch start event to support mobile devices
function handleTouchStart(e) {
  e.preventDefault();
  if (gameState !== 'playing') {
      resetGame();
  }
  const touch = e.touches[0]; // Get the first touch point
  startDrawing({ clientX: touch.clientX, clientY: touch.clientY });
}

// Handle touch move event to continue drawing on mobile devices
function handleTouchMove(e) {
  e.preventDefault();
  if (!isDrawing) return;
  const touch = e.touches[0];
  draw({ clientX: touch.clientX, clientY: touch.clientY });
}

// Displays instructions on how to play the game
function showInstructions() {
  gameState = 'instruction'; // Set the game state to instruction
  instructionElement.innerHTML = translations[currentLanguage].instruction; // Display instruction text in the current language
  instructionElement.classList.remove('hidden'); // Show instruction element
  percentageElement.classList.add('hidden'); // Hide score-related elements
  feedbackElement.classList.add('hidden');
  messageElement.classList.remove('hidden');
  scoreBoardElement.classList.add('hidden');
}

// Resets the game by clearing the canvas and updating the game state
function resetGame() {
  gameState = 'playing';
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  messageElement.classList.add('hidden'); // Hide the message element
  scoreBoardElement.classList.remove('hidden'); // Show the score board
}

// Starts drawing by recording the points and setting the drawing flag
function startDrawing(e) {
  if (gameState === 'playing') {
      isDrawing = true;
      points = []; // Reset points array
      addPoint(e); // Add the first point
  }
}

// Continues drawing by adding new points and drawing lines between them
function draw(e) {
  if (!isDrawing) return;
  addPoint(e); // Add new point to the list
  drawLine(); // Draw the line between the last two points
}

// Adds a point to the points array based on the mouse or touch position
function addPoint(e) {
  const rect = canvas.getBoundingClientRect(); // Get the canvas' position relative to the viewport
  const x = e.clientX - rect.left; // Calculate x position
  const y = e.clientY - rect.top; // Calculate y position
  points.push({x, y}); // Save point coordinates
}

// Draws a line between the last two points
function drawLine() {
  if (points.length < 2) return; // Ensure there are at least two points to draw a line

  const score = calculateScore(false); // Calculate the current drawing's score
  ctx.strokeStyle = getColorForScore(score); // Set stroke color based on the score
  ctx.lineWidth = 4; // Set line width
  ctx.lineCap = 'round'; // Make the line ends round for smoother visuals

  // Draw the line between the last two points
  ctx.beginPath();
  ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.stroke();
}

// Ends drawing when the user releases the mouse or stops touching the screen
function endDrawing() {
  if (!isDrawing) return;
  isDrawing = false; // Stop drawing
  const score = calculateScore(true); // Final score based on the completed circle
  showResult(score); // Show the final result to the user
}

// Calculates the score based on how circular the drawing is
function calculateScore(isFinal) {
  // Prevents scoring if the drawing has too few points
  if (points.length < 10) {
      scoreElement.textContent = `${translations[currentLanguage].keepDrawing}`;
      return 50; // Default mid-score if the drawing is incomplete
  }

  // Calculate the bounding box of the points to estimate the center and radius
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let point of points) {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
  }

  // Calculate the center and radius of the circle
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const radius = ((maxX - minX) + (maxY - minY)) / 4;

  // Calculate the error by measuring the distance of each point from the estimated center
  let totalError = 0;
  for (let point of points) {
      const distanceFromCenter = Math.sqrt(Math.pow(point.x - centerX, 2) + Math.pow(point.y - centerY, 2));
      totalError += Math.abs(distanceFromCenter - radius);
  }

  // Average error is used to calculate the score, with max error being 50% of the radius
  const averageError = totalError / points.length;
  const maxError = radius * 0.5;
  const score = Math.max(0, 100 - (averageError / maxError * 100)); // Score out of 100

  const color = getColorForScore(score); // Get color based on score
  const formattedScore = formatNumber(score); // Format the score to be shown as a percentage
  scoreElement.textContent = `${translations[currentLanguage].perfection}: ${formattedScore}`; // Show the score
  scoreElement.style.color = color; // Apply color to the score text

  // If this is the final score, draw the completed circle
  if (isFinal) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)'; // Highlight the final circle
      ctx.stroke();

      // Save high score if the new score is better than the existing high score
      if (score > highScore) {
          highScore = score;
          const formattedHighScore = formatNumber(highScore);
          highScoreElement.textContent = `${translations[currentLanguage].highScore}: ${formattedHighScore}`;
          saveHighScore();
      }
  }

  return score; // Return the calculated score
}

// Displays the result after drawing ends
function showResult(score) {
  gameState = 'result'; // Set the game state to result

  const formattedScore = formatNumber(score);
  percentageElement.textContent = formattedScore;
  percentageElement.style.color = getColorForScore(score);
  percentageElement.classList.remove('hidden'); // Show score percentage

  const formattedHighScore = formatNumber(highScore);
  highScoreDisplayElement.textContent = `${translations[currentLanguage].highScore}: ${formattedHighScore}`;
  highScoreDisplayElement.classList.remove('hidden'); // Show high score

  const feedback = getFeedback(score); // Get feedback message based on score
  feedbackElement.textContent = feedback;
  feedbackElement.classList.remove('hidden'); // Show feedback message

  instructionElement.textContent = translations[currentLanguage].playAgain; // Display play again message
  instructionElement.classList.remove('hidden');
  messageElement.classList.remove('hidden');
  scoreBoardElement.classList.add('hidden'); // Hide score board during result
}

// Generates feedback text based on the user's score
function getFeedback(score) {
  const feedback = translations[currentLanguage].feedback;
  if (score < 20) return feedback.terrible[Math.floor(Math.random() * feedback.terrible.length)];
  if (score < 40) return feedback.poor[Math.floor(Math.random() * feedback.poor.length)];
  if (score < 60) return feedback.average[Math.floor(Math.random() * feedback.average.length)];
  if (score < 80) return feedback.good[Math.floor(Math.random() * feedback.good.length)];
  if (score < 95) return feedback.excellent[Math.floor(Math.random() * feedback.excellent.length)];
  return feedback.perfect[Math.floor(Math.random() * feedback.perfect.length)];
}

// Determines color based on score (from red to green)
function getColorForScore(score) {
  const r = Math.floor(255 * (100 - score) / 100); // More red for lower scores
  const g = Math.floor(255 * score / 100); // More green for higher scores
  return `rgb(${r}, ${g}, 0)`; // Return RGB color string
}

// Loads high score from cookies
function loadHighScore() {
  const savedScore = getCookie('highScore');
  if (savedScore) {
      highScore = parseFloat(savedScore); // Parse and set high score
      const formattedHighScore = formatNumber(highScore);
      highScoreElement.textContent = `${translations[currentLanguage].highScore}: ${formattedHighScore}`;
  }
}

// Saves high score to cookies
function saveHighScore() {
  setCookie('highScore', highScore.toString(), 365); // Save high score for 365 days
}

// Sets a cookie with a specific expiration date
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString(); // Calculate expiration date
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict`; // Set the cookie
}

// Retrieves a cookie value by its name
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
      if (cookieName === name) return cookieValue; // Return value if cookie matches the name
  }
  return null; // Return null if cookie is not found
}

// Changes the language of the game and updates UI text accordingly
function changeLanguage() {
  currentLanguage = languageSelect.value; // Set language based on user selection
  showInstructions(); // Show instructions in the selected language
  loadHighScore(); // Reload high score to reflect in the new language
  updateSourceCodeText(); // Update source code link text
}

// Updates the source code link text in the current language
function updateSourceCodeText() {
  const githubLink = document.getElementById('githubLink');
  githubLink.textContent = translations[currentLanguage].sourceCode;
}

// Formats numbers to percentage with 2 decimal places
function formatNumber(number) {
  return new Intl.NumberFormat(translations[currentLanguage].locale, {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  }).format(number / 100); // Convert number to percentage format
}