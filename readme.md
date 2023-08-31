O padrão Facade é usado para fornecer uma interface simplificada para os modelos Customer e Order. Isso torna mais fácil para os clientes dos facades interagirem com os modelos.

O padrão Observer é usado para permitir que um objeto notifique outros objetos de mudanças em seu estado. Isso permite que outros componentes do sistema sejam notificados de mudanças nos pedidos sem ter que consultar diretamente o banco de dados.

O projeto também utiliza a classe ModelFactory para facilitar a criação de instâncias dos modelos Customer e Order. A ModelFactory é um exemplo do padrão de projeto Factory Method, que define uma interface para criar um objeto, mas deixa a instanciação real para as subclasses
